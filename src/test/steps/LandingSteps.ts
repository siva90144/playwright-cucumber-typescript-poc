import { DataTable, Given, Then, When, setDefaultTimeout } from '@cucumber/cucumber';
import LandingPage from '../pages/LandingPage';
import { getPage } from '../../hooks/hooks';
import BasePage from '../pages/BasePage';
import Util from '../../helper/util/Util';

let landingPage: LandingPage;

Given('I login the application for {string}', async function (client: string) {
  landingPage = new LandingPage(getPage());
  await landingPage.launchApplication(client);
});

Given('I launch the application with {string} for {string}', async function (url:string,client: string) {
  landingPage = new LandingPage(getPage());
  await landingPage.launchApplicationWithURL(url,client);
});


When('I get the page title', async function () {
  await landingPage.getTitle();
});

Then('I verify details {string}',async function (title:string) {
  console.log('verify page title')
  await landingPage.verifyTitle(title)
})
When('I login the application with details',async function (details:DataTable) {
  console.log('DataTable');
  await landingPage.enterDetails(details.hashes()[0]);
  
})
