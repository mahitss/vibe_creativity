import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully",
      data: body,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process onboarding" },
      { status: 400 },
    );
  }
}
