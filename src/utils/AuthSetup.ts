import { LoginPage } from '@pages/LoginPage';
import { Browser, expect, Page } from '@playwright/test';
import { loadCredential } from '@utils/Credentials';
import fs from 'fs';
import path from 'path';

export async function getAuthenticatedPage(browser: Browser, credentialKey: string): Promise<Page> {
  const credential = loadCredential(credentialKey);
  const fileName = credential.communityKey + '-' + credential.email.split('@')[0];
  const storagePath = path.resolve(__dirname, '../../.auth', `storage-${fileName}.json`);

  let context;
  let page;
  let needsFreshLogin = false;

  if (fs.existsSync(storagePath)) {
    context = await browser.newContext({ baseURL: credential.baseUrl, storageState: storagePath });
    page = await context.newPage();

    await page.goto(credential.baseUrl);
    const loginPage = new LoginPage(page);

    if (await loginPage.isAtPage()) {
      needsFreshLogin = true;
      await context.close();
    }
  } else {
    needsFreshLogin = true;
  }

  if (needsFreshLogin) {
    context = await browser.newContext({ baseURL: credential.baseUrl });
    page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.navigate(credential.baseUrl);
    await expect(loginPage.isAtPage()).resolves.toBeTruthy();
    await loginPage.page.waitForSelector('.pace-active', { state: 'detached' });

    await loginPage.login(credential.email, credential.password);
    await page.waitForSelector('.fixed-top .navbar', { state: 'visible' });
    await context.storageState({ path: storagePath });
  }
  if (!page) {
    throw new Error('Failed to create or retrieve an authenticated page.');
  }

  return page;
}
