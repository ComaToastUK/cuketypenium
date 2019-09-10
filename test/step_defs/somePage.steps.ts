import * as dotenv from "dotenv";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Browser, } from "../lib" 
import { AllPages } from "../page_objects";

dotenv.config();
jest.setTimeout(60000);

const someFeature = loadFeature("../features/some.feature", {
  loadRelativePath: true
});

defineFeature(someFeature, test => {
    let pages: AllPages;

    beforeEach(async () => {
        pages = new AllPages(new Browser('chrome'));
    });
    afterEach(async () => {
        await pages.dispose();
    });

    test("Some feature", ({ given, and, when, then }) => {
        given("I am on some page", async () => {
            await pages.homePage.navigate();
        });

        and("I do something", async () => {

        });

        when("I do something else", async () => {
        });

        then("something should have happened", async () => {

        });
    });    
});

