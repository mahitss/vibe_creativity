import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { onboardingSchema, type OnboardingData } from "@/features/onboarding/lib/onboarding-schema";

async function requireUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return null;
  }

  return session.user;
}

function splitList(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildLongTermMemory(data: OnboardingData) {
  return {
    brandRules: {
      alwaysPrioritize: data.topicsAlwaysPrioritize,
      neverDiscuss: data.topicsNeverDiscuss,
      personality: data.brandPersonality,
      tone: data.preferredCommunicationTone,
    },
    connectedPlatforms: data.connectedPlatforms,
    creatorStyle: {
      contentTypes: data.preferredContentTypes,
      creatorTypes: data.creatorTypes,
      uploadFrequency: data.preferredUploadFrequency,
      workingHours: data.preferredWorkingHours,
    },
    futurePlans: data.goals,
    goals: data.goals,
    identity: {
      bio: data.bio,
      country: data.country,
      language: data.primaryLanguage,
      name: data.name,
      timezone: data.timezone,
      username: data.username,
    },
    interests: data.topicsAlwaysPrioritize,
    language: data.primaryLanguage,
    preferences: {
      communicationTone: data.preferredCommunicationTone,
      workingHours: data.preferredWorkingHours,
    },
  };
}

export async function GET() {
  const user = await requireUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const record = await prisma.user.findUnique({
    include: {
      connectedAccounts: true,
      goals: true,
      mindProfile: true,
      profile: true,
      settings: true,
    },
    where: { id: user.id },
  });

  return NextResponse.json({ record });
}

export async function PATCH(request: Request) {
  const user = await requireUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { data?: Partial<OnboardingData>; step?: number };
  const parsed = onboardingSchema.partial().parse(body.data ?? {});

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      data: {
        onboardingStatus: "IN_PROGRESS",
        onboardingStep: body.step ?? 0,
      },
      where: { id: user.id },
    });

    if (
      parsed.name ||
      parsed.username ||
      parsed.country ||
      parsed.timezone ||
      parsed.primaryLanguage
    ) {
      await tx.profile.upsert({
        create: {
          bio: parsed.bio,
          country: parsed.country ?? "Unspecified",
          displayName: parsed.name ?? user.name ?? "Creator",
          primaryLanguage: parsed.primaryLanguage ?? "English",
          profilePicture: parsed.profilePicture || user.image,
          timezone: parsed.timezone ?? "UTC",
          userId: user.id,
          username: parsed.username ?? `creator_${user.id.slice(0, 8)}`,
        },
        update: {
          bio: parsed.bio,
          country: parsed.country,
          displayName: parsed.name,
          primaryLanguage: parsed.primaryLanguage,
          profilePicture: parsed.profilePicture,
          timezone: parsed.timezone,
          username: parsed.username,
        },
        where: { userId: user.id },
      });
    }

    if (
      parsed.preferredUploadFrequency ||
      parsed.preferredWorkingHours ||
      parsed.preferredContentTypes ||
      parsed.preferredCommunicationTone ||
      parsed.brandPersonality ||
      parsed.topicsNeverDiscuss ||
      parsed.topicsAlwaysPrioritize
    ) {
      await tx.creatorSettings.upsert({
        create: {
          brandPersonality: parsed.brandPersonality,
          preferredContentTypes: parsed.preferredContentTypes ?? [],
          preferredTone: parsed.preferredCommunicationTone,
          preferredUploadFrequency: parsed.preferredUploadFrequency,
          preferredWorkingHours: { value: parsed.preferredWorkingHours },
          topicsAlwaysPrioritize: parsed.topicsAlwaysPrioritize ?? [],
          topicsNeverDiscuss: parsed.topicsNeverDiscuss ?? [],
          userId: user.id,
        },
        update: {
          brandPersonality: parsed.brandPersonality,
          preferredContentTypes: parsed.preferredContentTypes,
          preferredTone: parsed.preferredCommunicationTone,
          preferredUploadFrequency: parsed.preferredUploadFrequency,
          preferredWorkingHours: parsed.preferredWorkingHours
            ? { value: parsed.preferredWorkingHours }
            : undefined,
          topicsAlwaysPrioritize: parsed.topicsAlwaysPrioritize,
          topicsNeverDiscuss: parsed.topicsNeverDiscuss,
        },
        where: { userId: user.id },
      });
    }

    if (parsed.goals) {
      await tx.goal.deleteMany({ where: { userId: user.id } });
      await tx.goal.createMany({
        data: parsed.goals.map((goal) => ({
          text: goal,
          userId: user.id,
        })),
      });
    }

    if (parsed.connectedPlatforms) {
      await tx.connectedAccount.deleteMany({ where: { userId: user.id } });
      await tx.connectedAccount.createMany({
        data: parsed.connectedPlatforms.map((platform) => ({
          platform,
          status: "mock_connected",
          userId: user.id,
        })),
      });
    }
  });

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const user = await requireUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { data: OnboardingData };
  const data = onboardingSchema.parse({
    ...body.data,
    preferredContentTypes: splitList(body.data.preferredContentTypes),
    topicsAlwaysPrioritize: splitList(body.data.topicsAlwaysPrioritize),
    topicsNeverDiscuss: splitList(body.data.topicsNeverDiscuss),
  });
  const memoryNamespace = `creator:${user.id}:long-term`;
  const mindId = `mind_${crypto.randomUUID()}`;
  const longTermMemory = buildLongTermMemory(data);

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.update({
      data: {
        name: data.name,
        onboardingStatus: "COMPLETED",
        onboardingStep: 6,
      },
      where: { id: user.id },
    });

    await tx.profile.upsert({
      create: {
        bio: data.bio,
        country: data.country ?? "Unspecified",
        displayName: data.name ?? user.name ?? "Creator",
        primaryLanguage: data.primaryLanguage ?? "English",
        profilePicture: data.profilePicture || user.image,
        timezone: data.timezone ?? "UTC",
        userId: user.id,
        username: data.username ?? `creator_${user.id.slice(0, 8)}`,
      },
      update: {
        bio: data.bio,
        country: data.country,
        displayName: data.name,
        primaryLanguage: data.primaryLanguage,
        profilePicture: data.profilePicture,
        timezone: data.timezone,
        username: data.username,
      },
      where: { userId: user.id },
    });

    await tx.creatorSettings.upsert({
      create: {
        brandPersonality: data.brandPersonality,
        preferredContentTypes: data.preferredContentTypes,
        preferredTone: data.preferredCommunicationTone,
        preferredUploadFrequency: data.preferredUploadFrequency,
        preferredWorkingHours: { value: data.preferredWorkingHours },
        topicsAlwaysPrioritize: data.topicsAlwaysPrioritize,
        topicsNeverDiscuss: data.topicsNeverDiscuss,
        userId: user.id,
      },
      update: {
        brandPersonality: data.brandPersonality,
        preferredContentTypes: data.preferredContentTypes,
        preferredTone: data.preferredCommunicationTone,
        preferredUploadFrequency: data.preferredUploadFrequency,
        preferredWorkingHours: { value: data.preferredWorkingHours },
        topicsAlwaysPrioritize: data.topicsAlwaysPrioritize,
        topicsNeverDiscuss: data.topicsNeverDiscuss,
      },
      where: { userId: user.id },
    });

    await tx.goal.deleteMany({ where: { userId: user.id } });
    await tx.goal.createMany({
      data: data.goals.map((goal) => ({
        text: goal,
        userId: user.id,
      })),
    });

    await tx.connectedAccount.deleteMany({ where: { userId: user.id } });
    await tx.connectedAccount.createMany({
      data: data.connectedPlatforms.map((platform) => ({
        platform,
        status: "mock_connected",
        userId: user.id,
      })),
    });

    const mind = await tx.mindProfile.upsert({
      create: {
        creatorProfile: data,
        initialMemory: longTermMemory,
        knowledgeGraph: {
          nodes: ["identity", "preferences", "goals", "platforms", "brand-rules"],
        },
        memoryNamespace,
        mindId,
        missionHistory: [],
        preferenceStore: longTermMemory.preferences,
        userId: user.id,
      },
      update: {
        creatorProfile: data,
        initialMemory: longTermMemory,
        memoryNamespace,
        preferenceStore: longTermMemory.preferences,
      },
      where: { userId: user.id },
    });

    await tx.mindMemory.createMany({
      data: [
        {
          category: "identity",
          content: longTermMemory.identity,
          mindProfileId: mind.id,
          namespace: memoryNamespace,
        },
        {
          category: "preferences",
          content: longTermMemory.preferences,
          mindProfileId: mind.id,
          namespace: memoryNamespace,
        },
        {
          category: "goals",
          content: longTermMemory.goals,
          mindProfileId: mind.id,
          namespace: memoryNamespace,
        },
        {
          category: "brand_rules",
          content: longTermMemory.brandRules,
          mindProfileId: mind.id,
          namespace: memoryNamespace,
        },
        {
          category: "connected_platforms",
          content: longTermMemory.connectedPlatforms,
          mindProfileId: mind.id,
          namespace: memoryNamespace,
        },
        {
          category: "creator_style",
          content: longTermMemory.creatorStyle,
          mindProfileId: mind.id,
          namespace: memoryNamespace,
        },
      ],
    });

    await tx.memoryItem.deleteMany({
      where: {
        creatorId: user.id,
        title: {
          in: [
            "Creator identity",
            "Working preferences",
            "Creator goals",
            "Connected platforms",
            "Brand rules",
            "Creator style",
          ],
        },
      },
    });

    await tx.memoryItem.createMany({
      data: [
        {
          confidence: 0.95,
          content: longTermMemory.identity,
          creatorId: user.id,
          description: `${data.name ?? "Creator"}'s durable identity, language, timezone, and profile context.`,
          importance: 1,
          memoryType: "IDENTITY",
          title: "Creator identity",
        },
        {
          confidence: 0.9,
          content: longTermMemory.preferences,
          creatorId: user.id,
          description: "Preferred working hours, communication tone, and collaboration style.",
          importance: 0.92,
          memoryType: "PREFERENCE",
          title: "Working preferences",
        },
        {
          confidence: 0.9,
          content: { goals: data.goals, futurePlans: data.goals },
          creatorId: user.id,
          description: "Creator goals and future plans captured during onboarding.",
          importance: 0.96,
          memoryType: "PROJECT",
          title: "Creator goals",
        },
        {
          confidence: 0.86,
          content: { platforms: data.connectedPlatforms },
          creatorId: user.id,
          description: "Audience and publishing platforms connected during onboarding.",
          importance: 0.84,
          memoryType: "COMMUNITY",
          title: "Connected platforms",
        },
        {
          confidence: 0.9,
          content: longTermMemory.brandRules,
          creatorId: user.id,
          description:
            "Brand personality, priority topics, avoided topics, and communication rules.",
          importance: 0.94,
          memoryType: "PREFERENCE",
          title: "Brand rules",
        },
        {
          confidence: 0.88,
          content: longTermMemory.creatorStyle,
          creatorId: user.id,
          description:
            "Creator type, preferred content formats, upload cadence, and working rhythm.",
          importance: 0.88,
          memoryType: "IDENTITY",
          title: "Creator style",
        },
      ],
    });

    await tx.mission.create({
      data: {
        mindProfileId: mind.id,
        state: {
          source: "onboarding",
          storedMemoryNamespace: memoryNamespace,
        },
        status: "COMPLETED",
        title: "Create persistent creator identity",
      },
    });

    await tx.activityHistory.create({
      data: {
        action: "onboarding.completed",
        metadata: {
          memoryNamespace,
          mindId: mind.mindId,
        },
        userId: user.id,
      },
    });

    return mind;
  });

  return NextResponse.json({
    creatorName: data.name ?? user.name ?? "Creator",
    memoryNamespace,
    mindId: result.mindId,
  });
}
