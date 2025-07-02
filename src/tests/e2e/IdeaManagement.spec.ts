import { expect, test } from "@fixtures/PageFixtures";
import { IdeaManagementPage } from '@pages/IdeaManagementPage';
import { getAuthenticatedPage } from "@utils/AuthSetup";

test.describe('Idea Management Page Test', () => {
    test('verify navigating to communityHomePage from idea management page should succeed', async ({ browser }) => {
        const adminPage = await getAuthenticatedPage(browser, 'SMOKE_WORKSPACE_ADMIN');
        const ideaManagementPage = new IdeaManagementPage(adminPage);
    
        await test.step('go to idea management page', async () => {
            await ideaManagementPage.navigate();
            await expect(ideaManagementPage.isAtPage()).resolves.toBeTruthy();
        });

    });
});