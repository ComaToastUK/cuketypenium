import 'reflect-metadata';

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const findBy = (selector: string,  strategy?: string ) => {
  return (target: any, propertyKey: string) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        get: function() {
          if (!strategy || strategy === "css") {
            const promise = (this as any).browser.findElementByCss(selector);
            return new type(promise, selector);
          } else if (strategy === 'xpath')  {
              const promise = (this as any).browser.findElementByXpath(selector);
              return new type(promise, selector);
          }
        },
    });
  };
}