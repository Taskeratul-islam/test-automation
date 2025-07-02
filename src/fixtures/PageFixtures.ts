import { CommunityHomePage } from "@pages/CommunityHomePage";
import { LoginPage } from "@pages/LoginPage";
import { WorkspaceLandingPage } from "@pages/WorkspaceLandingPage";
import { IdeaManagementPage } from "@pages/IdeaManagementPage"; 
import { test as base } from '@playwright/test';

type PageFixtures = {
  loginPage: LoginPage;
  communityHomePage: CommunityHomePage;
  workspaceLandingPage: WorkspaceLandingPage;
  ideaManagementPage: IdeaManagementPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  communityHomePage: async ({ page }, use) => {
    const communityHomePage = new CommunityHomePage(page);
    await use(communityHomePage);
  },

  workspaceLandingPage: async ({ page }, use) => {
    const workspaceLandingPage = new WorkspaceLandingPage(page);
    await use(workspaceLandingPage);
  },

  ideaManagementPage: async ({ page }, use) => {
    const ideaManagementPage = new IdeaManagementPage(page);
    await use(ideaManagementPage);
  },
});

export { expect } from "@playwright/test";