import { Locator, Page } from '@playwright/test';

export class UsersPage {
  readonly page: Page;
  readonly usersTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usersTable = page.locator('//table[@id="usersTable"]');
  }

  async goto() {
    await this.page.goto('/users');
  }

  async getUserRowByEmail(email: string) {
    return this.usersTable.locator(`tr:has-text("${email}")`);
  }

  async deleteUserByEmail(email: string) {
    const row = await this.getUserRowByEmail(email);
    await row.locator('//button[@class="btn-action btn-delete"]').click();
  }
  async editUserByEmail(email: string) {
    const row = await this.getUserRowByEmail(email);
    await row.locator('//button[@class="btn-action btn-edit"]').click();
    }
}
