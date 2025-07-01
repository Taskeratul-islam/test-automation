import { expect, Page } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  abstract getPageId(): string;

  abstract getPageUrl(): string;

  protected async acceptCookiesIfVisible(): Promise<void> {
    try {
      const cookieBanner = this.page.locator(".cookie-consent-modal");
      if (await cookieBanner.isVisible()) {
        await this.page.locator('button[data-action-url$="accept"]').click();
        await this.page.waitForSelector('.pace-active', { state: 'detached' });
      }
    } catch (error) {
      console.log("Cookie banner check failed, page might be navigating");
    }
  }

  async getCurrentPageId(): Promise<string> {
    const bodyElement = this.page.locator("body");
    await bodyElement.waitFor({ state: "attached" });

    const pageId = await this.page.waitForFunction(
      () => document.body.getAttribute("data-test-element-id")
    );
    return pageId?.toString();
  }

  async isAtPage(): Promise<boolean> {
    const currentPageId = await this.getCurrentPageId();
    const expectedPageId = this.getPageId();

    return currentPageId === expectedPageId;
  }
}
