import * as assert from "assert";
import { chromium } from "playwright";

let page: any;
let browser: any;

describe("Страница логина", () => {
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await chromium.launch()
      : await chromium.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("https://fc.frfrstaging.pw/login", {
        waitUntil: "networkidle0",
      })
  });

  afterAll(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  test("Доступ есть", async () => {
    await page.fill('#login_username', '74444444422');
    await page.fill('#login_password', '74444444422');
    await page.click('[data-e2e=login-button]')
    await page.waitForNavigation({ url: '**/reviews' })
    const url = await page.url()

    assert(url, 'https://fc.frfrstaging.pw/reviews')
  });
});
