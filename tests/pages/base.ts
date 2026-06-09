import { FormPage, UsersPage } from './index'
import {test as base, expect, type Page} from '@playwright/test'

export const test = base.extend<{
  formPage: FormPage
  usersPage: UsersPage
}>({
  formPage: async({page}: { page: Page }, use: (formPage: FormPage) => Promise<void>) => { await use(new FormPage(page)) },
  usersPage: async({page}: { page: Page }, use: (usersPage: UsersPage) => Promise<void>) => { await use(new UsersPage(page)) },
})

export {expect}