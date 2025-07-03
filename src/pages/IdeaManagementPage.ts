import { TopBar } from "@components/TopBar";
import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";

const IDEA_MANAGEMENT_PUBLIC_URL = process.env.IDEA_MANAGEMENT_PUBLIC_URL;

export class IdeaManagementPage extends BasePage {
    private communityKey?: string;

    constructor(page: Page) {
        super(page);
    }

    getPageId(): string {
        return "idea-portfolio";
    }

    getPageUrl(): string {
        return `${IDEA_MANAGEMENT_PUBLIC_URL}/community${this.communityKey ? `/${this.communityKey}/` : "/"}`;
    }

    async navigate(baseUrl?: string): Promise<void> {
        const url = baseUrl ? `${baseUrl}${this.getPageUrl()}` : this.getPageUrl();
        await this.page.goto(url);
    }

    withTargetCommunityKey(communityKey: string): this {
        this.communityKey = communityKey;
        return this;
    }

    getTopBar(): TopBar {
    return new TopBar(
        this.page, 
        this.page.locator("nav#universal-top-bar, nav.navbar-top")
    );
  }
}