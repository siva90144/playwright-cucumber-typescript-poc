import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';
import Util from '../../helper/util/Util';
import Constants from '../../helper/util/Constants';
import AppConfiguration from '../../config/AppConfiguration';

export default class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private userNameOrProfile = '//input[@id="identifierName"] | //input[@name="agentProfile"]//following::span[text()="Advanced User"]';
  private userName = 'input#identifierName,input#username';
  private password = 'input#password';
  private nextBtn = '//*[@id="postButton"]/a';
  private login_btn = "//a[@class='ping-button normal allow']";
  private start = 'button#start-interaction-button';
  private profile = 'text=Advanced User';
  private continue_btn = 'text=Continue';
  private selectClient = "//label[text()='Client']//..//div[contains(@class,'select__input-container')]//input";
  private selectClientChannel = "//div[@id='clientChannelDropdown-selections']";
  private mobileNumberTxtBox = "//input[@name='mobileNumber']";
  private search = "//button[@type='submit']";
  private correlationId = 'getTabDetails().CorrelationId';
  private username = '//input[@name="email"]';
  private pass = '//input[@name="pass"]';
  private login_fb = '//button[@name="login"]';

  async launchApplication(client: string) {
    let clientName = process.env.npm_config_client || client;
    await AppConfiguration.setClient(clientName);
    const baseUrl: string | undefined = await AppConfiguration.getBaseURL();
    await this.page.goto(baseUrl!);
  }

  async getTitle() {
    //await expect(this.page.title)
    const title = await this.page.title();
    console.log('title is: ' + title);
  }
  async verifyTitle(title: string) {
    expect(await this.page.title()).toContain(title);
    console.log('verification');
  }
  async enterDetails(details: object) {
    for (const [key, value] of Object.entries(details)) {
      switch (key) {
        case 'userName':
          console.log('username is: ' + value);
          await this.page.fill(this.username, value);
          break;
        case 'password':
          console.log('pwd is: ' + value);
          await this.page.fill(this.pass, value);
          break;
        default:
        expect('invalid case found:'+key).toThrowError;
      }
    }
    await this.page.click(this.login_fb);
          console.log('login clicked');
  }
}
