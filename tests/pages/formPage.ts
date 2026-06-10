import { Page, Locator } from '@playwright/test';

export class FormPage {
  readonly page: Page;

  // Locators
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.nameInput = page.locator('//*[@id="name"]');
    this.emailInput = page.locator('//*[@id="email"]');
    this.phoneInput = page.locator('//*[@id="phone"]');
    this.submitButton = page.locator('//*[@type="submit"]');
    this.successMessage = page.locator('//*[@id="message"]');
  }

  // Methods
  async goto() {
    await this.page.goto('');
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  async fillFormAndSubmit(name: string, email: string, phone: string) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPhone(phone);
    await this.submitForm();
  }
}
