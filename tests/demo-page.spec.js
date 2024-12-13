import { test, expect } from '@playwright/test';
import LoginPage from "../pages/loginPage";
const testcases = JSON.parse(JSON.stringify(require("../data/testScenarios.json")))

test.describe("Demo", function () {

    for (const testcase of testcases) {

        test.describe(testcase.Id, function () {

            test(testcase.description, async ({ page }) => {
                const login = new LoginPage(page)
                // Login
                await login.loginToApp();

                // Navigate to the specified application section
                console.log("column name:" + testcase.column)
                console.log("task name:" + testcase.task)
                await login.verifyTaskInColumn(page, testcase.column, testcase.task)

                // Check tags
                console.log(typeof(testcase.tags));
                const tag =testcase.tags;           

                 for (let i=0;i<tag.length;i++) {
                    console.log(tag);
                    await login.verifyTaskTags(page, testcase.navigation,testcase.column,testcase.task, tag[i]);
                }  

            });

        });

    }

})

