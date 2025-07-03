import { expect, Page } from "@playwright/test";
import { TopBar } from "@components/TopBar";

export abstract class AbstractPage {
  readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  abstract getPageId(): string;

  abstract getPageUrl(): string;

  getTopBar<T extends TopBar = TopBar>(): T {
    return new TopBar(
      this.page,
      this.page.locator("nav#universal-top-bar, nav.navbar-top")
    ) as T;
  }
}