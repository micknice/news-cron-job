const fs = require('fs')
const puppeteer = require('puppeteer')

const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const testUrl = 'https://www.theguardian.com/science/2023/dec/27/3d-printed-chip-showing-bodys-reaction-to-drugs-could-end-need-for-animal-tests';

const scrapeArticleBody = async (url) => {
    try {
    const browser = await puppeteer.launch({headless: true });
    const page = await browser.newPage();
  
    await page.goto(url);
    await delay(2000)
    //switch iFrame to cookies permissions frame and click accept
    const iframeSelector = 'iframe[id="sp_message_iframe_882219"]';
    await page.waitForSelector(iframeSelector);
    const iframeElementHandle = await page.$(iframeSelector);
    const iframe = await iframeElementHandle.contentFrame();
    
    const buttonSelector = 'text=Yes, I’m happy'; 
    await iframe.waitForSelector(buttonSelector);
    await iframe.click(buttonSelector);
    
    //switch back to main frame and scrape article body
    const mainFrame = page.mainFrame();

    const divSelector = '#maincontent > div';
    await mainFrame.waitForSelector(divSelector);
    const pTags = await mainFrame.$$(`${divSelector} p`);
    const pTexts = await Promise.all(pTags.map(pTag => mainFrame.evaluate(el => el.textContent, pTag)));

    const authorDivSelector ='body > main > article > div > div > aside.dcr-1rbr3jc > div > div > div > div.dcr-5l2n46 > div > address > div'
    
    // console.log('pTexts', pTexts)
    await browser.close();

    return pTexts

    } catch (error) {
        console.log(error)
    }
  };

//   const result = await scrapeArticleBody(testUrl)
//  console.log(result)

module.exports = {scrapeArticleBody}