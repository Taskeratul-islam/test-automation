import { loadEnv } from "@utils/Credentials";
import { WorkspaceHeader } from "@components/WorkspaceHeader";
import { BasePage } from "@pages/BasePage";
import { Locator, Page } from "@playwright/test";

loadEnv();
const WORKSPACE_PUBLIC_URL = process.env.WORKSPACE_PUBLIC_URL;

export class WorkspaceLandingPage extends BasePage {
  private readonly workspaceHeaderContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.workspaceHeaderContainer = this.page.locator(".workspace-header");
  }

  getPageId(): string {
    return "landing-page";
  }

  getPageUrl(): string {
    return `${WORKSPACE_PUBLIC_URL}`;
  }

  async navigate(baseUrl?: string): Promise<void> {
    const url = baseUrl ? `${baseUrl}${this.getPageUrl()}` : this.getPageUrl();
    await this.page.goto(url);
  }

  getWorkspaceHeader(): WorkspaceHeader {
    return new WorkspaceHeader(
      this.page,
      this.workspaceHeaderContainer
    );
  }
}
