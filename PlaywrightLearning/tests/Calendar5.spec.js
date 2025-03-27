import { test, expect } from '@playwright/test';
test("Calendar validations",async ({page}) =>
{
    const monthNumber = "6";
    const day = "25";
    const year = "2027";
    const expectedList = [monthNumber,day,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    //array start at 0
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+day+"']").click();   
    //assertion is by taking the entire date block & compare with the given data
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for(let index =0;index<inputs.length; ++index){
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
})