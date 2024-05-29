import { Given, Then, When, setDefaultTimeout } from '@cucumber/cucumber';
import LandingPage from '../pages/LandingPage';
import { getPage } from '../../hooks/hooks';
import BasePage from '../pages/BasePage';
import Util from '../../helper/util/Util';

let basePage: BasePage;
let landingPage: LandingPage;

Given('I login the application for {string}', async function (client: string) {
  landingPage = new LandingPage(getPage());
  await landingPage.launchApplication(client);
});



When('I get the page title', async function () {
  await landingPage.getTitle();
});

Then('I verify details {string}',async function (title:string) {
  await landingPage.verifyTitle(title)
})
