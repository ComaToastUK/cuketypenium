import 'chromedriver';
import { Builder, ThenableWebDriver, By, WebElementPromise } from 'selenium-webdriver';
import { WaitCondition } from "./";

export class Browser {
    private driver: ThenableWebDriver;
    public constructor(private browserName: string) {
        this.driver = new Builder().forBrowser(browserName).build();
    }

    public async navigate(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public findElementByCss(selector: string): WebElementPromise {
        return this.driver.findElement(By.css(selector));
    }

    public findElementByXpath(selector: string): WebElementPromise {
        return this.driver.findElement(By.xpath(selector));
    }

    public async clearCookies(url?: string): Promise<void> {
        if(url) {
            const currentUrl = await this.driver.getCurrentUrl();
            await this.navigate(url);
            await this.driver.manage().deleteAllCookies();
            await this.navigate(currentUrl);
        } else {
            await this.driver.manage().deleteAllCookies();
        }
    }

    public async wait(condition: WaitCondition) {
        await this.waitAny(condition);
      }


    public async waitAny(conditions: WaitCondition | WaitCondition[]): Promise<void> {
        const conditionsList = (!(conditions instanceof Array)) ? [ conditions ] : conditions;
        await this.driver.wait(async () => {
            for (const condition of conditionsList) {
                try {
                    if (await condition(this) === true) {
                        return true;
                    }
                    continue;
                } catch (ex) {
                    continue;
                }
            }
        });
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }
}

