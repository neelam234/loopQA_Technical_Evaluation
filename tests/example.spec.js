// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";

test('testing', async ({ page }) => {

  //Login

  const login = new LoginPage(page)
  await login.loginToApp();
  console.log("success");

});