import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getPageId(): string {
    return "login-page";
  }

  getPageUrl(): string {
    return "/a/workspace/login";
  }

  async navigate(baseUrl?: string): Promise<void> {
    const url = baseUrl ? `${baseUrl}${this.getPageUrl()}` : this.getPageUrl();
    await this.page.goto(url);
  }

  async fillEmail(email: string): Promise<void> {
    const emailField = this.page.getByRole("textbox", { name: "Email" });
    await emailField.click();
    await emailField.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    const passwordField = this.page.getByRole("textbox", { name: "Password" });
    await passwordField.click();
    await passwordField.fill(password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.acceptCookiesIfVisible();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.page.getByRole("button", { name: "Log in" }).click();
  }
}
