import { WebComponent } from ".";

class WebComponentEnsurer {
    constructor(private component: WebComponent) {

    }

    public async textEquals(expected: string) {
        const text = await this.component.getText();

        if (expected.trim() !== text.trim()) {
            throw new Error(`Element ${this.component.selector} text is '${text}'. Expected value is '${expected}'`);
        }
    }

    public async isVisible() {
        if (!await this.component.isDisplayed()) {
            throw new Error(`Element ${this.component.selector} is visible`);
        }
    }

    public async isNotVisible() {
        if (await this.component.isDisplayed()) {
            throw new Error(`Element ${this.component.selector} is visible`);
        }
    }

    public async isNotDisabled() {
        if (await this.component.isDisabled()) {
            throw new Error(`Element ${this.component.selector} is disabled`);
        }
    }

    public async isSelected() {
        if (!await this.component.isSelected()) {
            throw new Error(`Element ${this.component.selector} is selected`)
        }
    }

    public async isNotSelected() {
        if (await this.component.isSelected()) {
            throw new Error(`Element ${this.component.selector} is not selected`)
        }
    }
}

export function ensure(component: WebComponent): WebComponentEnsurer;
export function ensure(component: WebComponent): any {
if (component instanceof WebComponent) {
        return new WebComponentEnsurer(component);
    }
}
