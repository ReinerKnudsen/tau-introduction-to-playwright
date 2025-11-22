import { expect, type Page, type Locator } from '@playwright/test';

export class TopMenuPage {
  // properties
  readonly page: Page;
  readonly nodeLink: Locator;
  readonly javaLink: Locator;
  readonly nodeLabel: Locator;
  readonly javaLabel: Locator;
  readonly nodeText = 'Installing Playwright';
  readonly javaText = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;

  constructor(page: Page) {
    this.page = page;
    this.nodeLink = page.getByRole('button', { name: 'Node.js' });
    this.javaLink = page.getByRole('navigation', { name: 'Main' }).getByText('Java');
    this.nodeLabel = page.getByText(this.nodeText, { exact: true });
    this.javaLabel = page.getByText(this.javaText);
  }

  /** methods  */
  // actions
  async hoverNode() {
    await this.nodeLink.hover();
  }
  async clickJava() {
    await this.javaLink.click();
  }

  // assertions
  async assertPageUrl(url: RegExp) {
    await expect(this.page).toHaveURL(url);
  }
  async assertNodeDescriptionNotVisible() {
    await expect(this.nodeLabel).not.toBeVisible();
  }
  async assertJavaDescriptionVisible() {
    await expect(this.javaLabel).toBeVisible();
  }
}
