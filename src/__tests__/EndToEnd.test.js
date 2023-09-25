import puppeteer from 'puppeteer-core';

//jest.setTimeout(15000);

// feature 1
describe('Filter Events By City', () => {

   let browser;
   let page;
   beforeAll(async () => {
      browser = await puppeteer.launch({ headless: true/*, slowMo: 250, timeout: 0*/, executablePath: '/home/tanvir/.cache/puppeteer/chrome/linux-117.0.5938.92/chrome-linux64/chrome' });
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.setViewport({width: 1920, height: 1600});
      await page.waitForSelector('.events');
   });

   afterAll(async() => {
      await browser.close();
   });
   
   test('When user has not searched for a city, show upcoming events from all cities', async () => {

      const events = await page.$$('.event');
      expect(events).toBeDefined();
      expect(events).toHaveLength(32);
   });

   let suggestions;
   test('User should see a list of suggestions when they search for a city', async () => {

      await page.focus('input.city');
      await page.keyboard.type('Berlin');
      await page.waitForSelector('.suggestions');
      suggestions = await page.$$('.suggestions li');
      expect(suggestions).toHaveLength(2);

   });

   test('User can select a city from the suggested list', async () => {
      
      await suggestions[0].click();
      await page.waitForSelector('.events');
      const eventsCount = await page.$$('.events li');
      expect(eventsCount).toHaveLength(3);
   });
});

// feature 2
describe('show/hide an event details', () => {

   let browser;
   let page;
   beforeAll(async () => {
      browser = await puppeteer.launch({ headless: true /*, slowMo: 250, timeout: 0*/, executablePath: '/home/tanvir/.cache/puppeteer/chrome/linux-117.0.5938.92/chrome-linux64/chrome' });
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.setViewport({width: 1920, height: 1600});
      await page.waitForSelector('.events');
   });

   afterAll(async() => {
      await browser.close();
   });

   test('An event element is collapsed by default', async () => {

      const eventDetails = await page.$('.accordion-button.collapse.show:first-child');
      expect(eventDetails).toBeNull();
   });

   test('User can expand an event to see its details', async () => {
  
      await page.click('.accordion-button:first-child');

      const eventDetails = await page.$('.accordion-button.collapse.show:first-child');
      expect(eventDetails).toBeDefined();
   });

   test('User can collapse an event to hide details', async () => {

      await page.click('.accordion-button:first-child');
      const eventDetails = await page.$('.accordion-button.collapse.show:first-child');
      expect(eventDetails).toBeNull();
   });
});