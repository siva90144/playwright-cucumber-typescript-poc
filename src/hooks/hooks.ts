import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { invokeBrowser } from "../helper/browsers/browserManager";
import * as fs from "fs-extra";
import BasePage from "../test/pages/BasePage";
import path from 'path';
setDefaultTimeout(1000 * 60 * 4);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name;
  console.log('Start Executing the Scenario: '+scenarioName)
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  context.setDefaultTimeout(60000);
  page = await context.newPage();
});

After(async function ({ pickle, result }) {
  let videoPath: string | undefined = undefined;
  let img: Buffer | undefined;
  if (result?.status == Status.FAILED) {
    img = await page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
    videoPath = await page.video()?.path();
    if (videoPath) {
      await this.attach(fs.readFileSync(videoPath), "video/webm");
    }
  }
  await page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

export function getPage(): Page {
  return page;
}
export function getContext(): BrowserContext {
  return context;
}
