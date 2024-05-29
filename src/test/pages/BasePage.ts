import { Page, expect } from '@playwright/test';

export default class BasePage {
 
  public page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public static responseData: Map<string, string> = new Map<string, string>();
  //public static dbData: Map<string, string> = new Map<string, string>();
  public static dbObject: any;


  

}
