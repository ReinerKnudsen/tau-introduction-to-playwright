import { expect, type Page, type Locator } from '@playwright/test';

export class HomePage {
  // properties
  readonly page: Page;
  readonly getStartetLink: Locator;

  // constructor
  constructor(page: Page) {
    this.page = page;
    this.getStartetLink = page.getByRole('link', { name: 'Get started' });
  }

  // methodes (actions & asserts)

  async clickGetStarted() {
    this.getStartetLink.click();
  }
  async assertPageTitle(title: RegExp) {
    await expect(this.page).toHaveTitle(title);
  }
}
