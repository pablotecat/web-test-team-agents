import { Locator, Page } from '@playwright/test';

export class UsersPage {
  readonly page: Page;
  readonly addUserButton: Locator;
  readonly userNameInput: Locator;
  readonly userEmailInput: Locator;
  readonly saveUserButton: Locator;
  readonly usersTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addUserButton = page.locator('button:has-text("Add User")');
    this.userNameInput = page.locator('input[name="name"]');
    this.userEmailInput = page.locator('input[name="email"]');
    this.saveUserButton = page.locator('button:has-text("Save")');
    this.usersTable = page.locator('table#users');
  }

  async goto() {
    await this.page.goto('/users');
  }

  async clickAddUser() {
    await this.addUserButton.click();
  }

  async fillUserForm(name: string, email: string) {
    await this.userNameInput.fill(name);
    await this.userEmailInput.fill(email);
  }

  async saveUser() {
    await this.saveUserButton.click();
  }

  async addUser(name: string, email: string) {
    await this.clickAddUser();
    await this.fillUserForm(name, email);
    await this.saveUser();
  }

  async getUserRowByEmail(email: string) {
    return this.usersTable.locator(`tr:has-text("${email}")`);
  }

  async deleteUserByEmail(email: string) {
    const row = await this.getUserRowByEmail(email);
    await row.locator('button:has-text("Delete")').click();
  }
}
