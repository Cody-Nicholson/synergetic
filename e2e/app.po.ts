import { browser, by, element } from 'protractor';

export class SynPage {
  navigateTo() {
    return browser.get('/');
  }

  getPROText() {
    return element(by.css('.pro-title')).getText();
  }
}
