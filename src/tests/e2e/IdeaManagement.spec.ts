import { expect, test } from "@fixtures/PageFixtures";
import { IdeaManagementPage } from '@pages/IdeaManagementPage';
import { getAuthenticatedPage } from "@utils/AuthSetup";
import { CommunityHomePage } from '@pages/CommunityHomePage';

const COMMUNITY_ADMIN_KEY = 'IDEA_MANAGEMENT_COMMUNITY_ADMIN';
const COMMUNITY_KEY = process.env.IDEA_MANAGEMENT_COMMUNITY_ADMIN_COMMUNITY_KEY || '';

test.describe('Idea Management Page Test', () => {
    test('verify navigating to communityHomePage from idea management page should succeed', async ({ browser }) => {
        const adminPage = await getAuthenticatedPage(browser, COMMUNITY_ADMIN_KEY);
        const ideaManagementPage = new IdeaManagementPage(adminPage);

        await test.step('go to idea management page', async () => {
            await ideaManagementPage.withTargetCommunityKey(COMMUNITY_KEY).navigate();
            await expect(ideaManagementPage.isAtPage()).resolves.toBeTruthy();
        });

        await test.step('navigate to communityHomePage', async () => {
            const communityHomePage = await ideaManagementPage.getTopBar().clickHomeButton(CommunityHomePage);
            await expect(communityHomePage.isAtPage()).resolves.toBeTruthy();
        });
    });
});