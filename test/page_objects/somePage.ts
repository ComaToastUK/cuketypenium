import { WebComponent, Browser, Page, findBy, elementIsVisible, pageHasLoaded } from '../lib';
import { elementIsEnabled } from 'selenium-webdriver/lib/until';
import { WebElement } from 'selenium-webdriver';
import { somePageSelectorConfig } from "../selector.config"

export class somePage extends Page {
    constructor(browser: Browser) {
        super(browser);
    }

    @findBy(somePageSelectorConfig.SomeSelector)
    public someSelector!: WebComponent;

    public loadCondition() {
        return elementIsVisible(() => this.someSelector);
    }
}