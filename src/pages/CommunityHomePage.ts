import { BasePage } from "@pages/BasePage";
import { Page } from "@playwright/test";

const WORKSPACE_PUBLIC_URL = process.env.WORKSPACE_PUBLIC_URL;

export class CommunityHomePage extends BasePage {
    private communityKey?: string;

    constructor(page: Page) {
        super(page);
    }

    getPageId(): string {
        return "community-home";
    }

    getPageUrl(): string {
        return `${WORKSPACE_PUBLIC_URL}${this.communityKey ? `/${this.communityKey}` : ""}`;
    }

    async navigate(baseUrl?: string): Promise<void> {
        const url = baseUrl ? `${baseUrl}${this.getPageUrl()}` : this.getPageUrl();
        await this.page.goto(url);
    }

    withTargetCommunityKey(communityKey: string): this {
        this.communityKey = communityKey;
        return this;
    }
}
