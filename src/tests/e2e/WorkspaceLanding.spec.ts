import { expect, test } from "@fixtures/PageFixtures";
import { WorkspaceLandingPage } from '@pages/WorkspaceLandingPage';
import { getAuthenticatedPage } from "@utils/AuthSetup";

test.describe('Workspace Landing Page Test', () => {
    test('should display the workspace landing page to workspace admin', async ({ browser }) => {
        const adminPage = await getAuthenticatedPage(browser, 'SMOKE_WORKSPACE_ADMIN');
        const workspaceLandingPage = new WorkspaceLandingPage(adminPage);

        await test.step('go to workspace landing page', async () => {
            await workspaceLandingPage.navigate();
            await expect(workspaceLandingPage.isAtPage()).resolves.toBeTruthy();
        });

        await test.step('verify workspace name', async () => {
            const workspaceName = await workspaceLandingPage.getWorkspaceHeader().getWorkspaceName();
            expect(workspaceName).toBe('Smoke Test Workspace');
        });
    });

    test("should display the workspace landing page to workspace member", async ({ browser }) => {
        const memberPage = await getAuthenticatedPage(browser, 'SMOKE_WORKSPACE_REGULAR_MEMBER_1');
        const workspaceLandingPage = new WorkspaceLandingPage(memberPage);

        await test.step('go to workspace landing page', async () => {
            await workspaceLandingPage.navigate();
            await expect(workspaceLandingPage.isAtPage()).resolves.toBeTruthy();
        });

        await test.step('verify workspace name', async () => {
            const workspaceName = await workspaceLandingPage.getWorkspaceHeader().getWorkspaceName();
            expect(workspaceName).toBe('Smoke Test Workspace');
        });
    });
});
