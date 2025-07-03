import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";
import { CommunityHomePage } from "@pages/CommunityHomePage";

export class TopBar {
  private readonly page: Page;
  private readonly container: Locator;

  constructor(page: Page, container: Locator) {
    this.page = page;
    this.container = container;
  }
  
  async clickHomeButton<T extends BasePage>(clazz: new (page: Page) => T): Promise<T> {
    const homeButton = this.container.locator("a.nav-link[href$='/'], a.no-dropdown");
    await homeButton.first().click();
    return new clazz(this.page);
  }
}