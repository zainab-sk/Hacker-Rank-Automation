const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
const codeObj = require("./code");
(async function () {
  try {
    const browserInstance = await puppeteer.launch({
      headless: false,
      slowMo: true,
      args: ["--start-fullscreen"],
      defaultViewport: null,
    });
    let newTab = await browserInstance.newPage();
    await newTab.goto(url);
    await newTab.waitForSelector("#input-1");
    await newTab.click("#input-1");
    let email = "ricore8948@laluxy.com";
    await newTab.type("#input-1", email, {
      delay: 50,
    });
    let password = "ricore8948@laluxy";
    await newTab.waitForSelector("#input-2");
    await newTab.click("#input-2");
    await newTab.type("#input-2", password, {
      delay: 50,
    });
    await newTab.click('button[data-analytics="LoginPassword"]', { delay: 50 });
    await waitAndClick('a[data-attr1="algorithms"]', newTab);
    await waitAndClick('input[value="warmup', newTab);
    let allChallenges = await newTab.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled",
      { delay: 50 }
    );
    await questionSolver(allChallenges[1], newTab, codeObj.answer[0]);
    console.log("Total Questions", allChallenges.length);
  } catch (error) {
    console.log(error);
  }
})();
async function questionSolver(challenge, page, answer) {
  await Promise.all([challenge.click(), page.waitForNavigation()]);
  await waitAndClick(".checkbox-wrap", page);
  await page.waitForSelector("textarea.custominput");
  await page.type("textarea.custominput", answer, { delay: 10 });
  await page.evaluate(() => document.execCommand("selectall", false, null));
  // await page.click(
  //   "textarea.custominput",
  //   {
  //     button: "right",
  //   },
  //   { delay: 50 }
  // );
  let line = await page.$$(".view-line");
  let code = line[9];
  await code.click({ delay: 50 });
  await page.type(".view-line", "return a+b;", { delay: 50 });
  await page.click(".hr-monaco-submit", { delay: 100 });
}

async function waitAndClick(selector, cpage) {
  await cpage.waitForSelector(selector);
  let selectorClicked = cpage.click(selector);
  return selectorClicked;
}
const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));
