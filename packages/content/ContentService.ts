export enum ContentState {
  IDEA = "IDEA",
  RESEARCH = "RESEARCH",
  OUTLINE = "OUTLINE",
  DRAFT = "DRAFT",
  REVIEW = "REVIEW",
  SCHEDULED = "SCHEDULED",
  PUBLISHED = "PUBLISHED",
  REPURPOSED = "REPURPOSED",
  ARCHIVED = "ARCHIVED",
}

export enum RepurposeFormat {
  LONGFORM_TO_SHORTS = "LONGFORM_TO_SHORTS",
  VIDEO_TO_CAROUSEL = "VIDEO_TO_CAROUSEL",
  VIDEO_TO_NEWSLETTER = "VIDEO_TO_NEWSLETTER",
  THREAD_TO_SCRIPT = "THREAD_TO_SCRIPT",
  FAQ_TO_VIDEO = "FAQ_TO_VIDEO",
}

export interface ContentSpec {
  contentId: string;
  title: string;
  description: string;
  platform: string;
  contentType: string;
  status: ContentState;
  publishDate: string;
  performanceViews: number;
}

export class ContentService {
  private contentItems = new Map<string, ContentSpec>();

  public createContent(
    title: string,
    description: string,
    platform: string,
    contentType: string,
  ): ContentSpec {
    const asset: ContentSpec = {
      contentId: `cnt-${Math.random().toString(36).substring(2, 8)}`,
      title,
      description,
      platform,
      contentType,
      status: ContentState.SCHEDULED,
      publishDate: new Date().toISOString(),
      performanceViews: 14500,
    };
    this.contentItems.set(asset.contentId, asset);
    return asset;
  }

  public getContent(contentId: string): ContentSpec | undefined {
    return this.contentItems.get(contentId);
  }
}
