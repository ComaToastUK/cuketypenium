import { WebElementPromise } from 'selenium-webdriver';

export class WebComponent {
    constructor(protected element: WebElementPromise, public selector: string) {

    }

    public async click() {
        try {
            return await this.element.click();
        } catch (clickErr) {
            try {
                await this.element.getDriver().executeScript('arguments[0].click();', this.element);
            } catch (jsErr) {
                throw clickErr;
            }
        }
    }

    public async isDisplayed() {
        try {
            return await this.element.isDisplayed();
        } catch (ex) {
            return false;
        }
    }

    public async getText() {
        return await this.element.getText();
    }

    public async isDisabled() {
        try {
            return await this.element.getAttribute('disabled') === 'disabled';
        } catch (ex) {
            return false;
        }
    }

    public async isSelected() {
        try {
            return await this.element.isSelected()
        } catch (ex) {
            return false
        }
    }

    public type(text: string) {
        return this.element.sendKeys(text);
    }
}
