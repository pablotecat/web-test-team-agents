import { Page, Locator } from '@playwright/test';

export class NavMenu {
  readonly page: Page;

  // Locators
  readonly RegistroBtn: Locator;
  readonly UsuariosBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.RegistroBtn = page.locator('//*[@class="nav-link" and text()="Registro"]');
    this.UsuariosBtn = page.locator('//*[@class="nav-link" and text()="Ver Usuarios"]');
  }

  // Methods
  async navigateToRegistro() {
    await this.RegistroBtn.click();
  }
  async navigateToUsuarios() {
    await this.UsuariosBtn.click();
  }
}