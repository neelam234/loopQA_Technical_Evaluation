import { expect } from "playwright/test";

const data = JSON.parse((JSON.stringify(require("../data/testData.json"))))

// Login function
class LoginPage {

  constructor(page) {
    this.page = page;
    this.username = data.username;
    this.password = data.password;
    this.url = data.url;
  }

  async loginToApp() {

    await this.page.goto(data.url);
    await this.page.getByLabel('Username').fill(data.username);
    await this.page.getByLabel('Password').fill('password123');
    await this.page.locator('button[type="submit"]').click();


  }

  async verifyTaskInColumn(page, columnName, taskName) {
    // Build the locator using the column name and task name
    const taskSelector = `//div[h2[contains(text(), '${columnName}')]]//h3[text()='${taskName}']`;

    // Locate the task element
    const task = page.locator(taskSelector);

    await expect(task).toBeVisible;
  }

  async verifyTaskTags(page, navigation,column,task,tag) {

    const app = `//h2[contains(text(),'${navigation}')]`;
   
    const tagElement = `//div[contains(@class, 'flex') and .//h2[contains(text(),'${navigation}')]]//h2[contains(text(),'${column}')]/following-sibling::div//h3[contains(text(),'${task}')]/following-sibling::div//span[text()='${tag}']`;

    await page.locator(app).click();

    console.log(page.locator(tagElement));

    await expect(page.locator(tagElement)).toBeVisible();
    
  }

}
export default LoginPage