import { Locator, Page } from "@playwright/test";

export class WorkspaceHeader {
  private readonly page: Page;
  private readonly container: Locator;
  private readonly workspaceNameElement: Locator;

  constructor(page: Page, container: Locator) {
    this.page = page;
    this.container = container;
    this.workspaceNameElement = this.container.locator("h1");
  }

  async getWorkspaceName(): Promise<string> {
    return (await this.workspaceNameElement.textContent()) || "";
  }
}