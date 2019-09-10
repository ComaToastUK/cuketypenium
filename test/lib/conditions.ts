import { Browser, WebComponent, NewablePage, Page } from "./";

export type WaitCondition = (browser: Browser) => Promise<boolean>;

export function elementIsVisible(locator: () => WebComponent): WaitCondition {
    return async () => await locator().isDisplayed();
}

export function elementIsPresent(locator: () => WebComponent): WaitCondition {
    return async () => await locator() !== undefined;
}

export function pageHasLoaded<T extends Page>(page: NewablePage<T>): WaitCondition {
    return (browser: Browser) => {
        const condition = new page(browser).loadCondition();
        return condition(browser);
    };
}

export async function elementContainsText(elements: Array<WebComponent>, text: string): Promise<void> {
    elements.forEach(async element => {
        let e = await element.getText()
        return e === text ? element : false
    });
}