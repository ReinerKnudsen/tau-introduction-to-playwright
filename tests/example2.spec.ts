import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home2-page';
import { TopMenuPage } from '../pages/top-menu2-page';

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;
const pageTitle = /Playwright/;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
  await homePage.clickGetStarted();
  topMenuPage = new TopMenuPage(page);
}

test.describe('Playwright website', () => {
  test('has title', async () => {
    await homePage.assertPageTitle(pageTitle);
  });

  test('get started link', async ({ page }) => {
    // Act
    await clickGetStarted(page);
    // Assert
    await topMenuPage.assertPageUrl(pageUrl);
  });

  test('check Java page', async ({ page }) => {
    await test.step('Act', async () => {
      await clickGetStarted(page);
      await topMenuPage.hoverNode();
      await topMenuPage.clickJava();
    });

    await test.step('Assert', async () => {
      await topMenuPage.assertPageUrl(pageUrl);
      await topMenuPage.assertNodeDescriptionNotVisible();
      await topMenuPage.assertJavaDescriptionVisible();
    });
  });
});
