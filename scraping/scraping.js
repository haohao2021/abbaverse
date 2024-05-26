const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

let rawData = fs.readFileSync(path.join(__dirname, "../public/data.json"));
let jsonData = JSON.parse(rawData);

async function scrapeData() {
    const browser = await puppeteer.launch({
        headless: false,  // 如果需要可以设置为 true 进行无头模式测试
    });
    const page = await browser.newPage();

    try {
        await page.goto("https://secondhandsongs.com/artist/119/originals#nav-entity", { waitUntil: 'networkidle0', timeout: 60000 });

        const maxAttempts = 5;
        let attempts = 0;
        let consentClicked = false;
        while (attempts < maxAttempts && !consentClicked) {
            try {
                await page.waitForSelector("button.fc-cta-consent", { timeout: 10000 });
                await page.click("button.fc-cta-consent");
                consentClicked = true;  // 设置为 true，表示已成功点击
            } catch (error) {
                console.error(`Retry clicking consent button: Attempt ${attempts + 1}`, error);
                attempts++;
                if (attempts === maxAttempts) {
                    throw new Error('Failed to interact with consent button after retries.');
                }
            }
        }
    } catch (error) {
        console.error('Error during navigation or consent interaction:', error);
        await browser.close();
        return;
    }

    let links;
    try {
        links = await page.evaluate(() => {
            const linkSelector = document.querySelectorAll('table tbody tr td a[itemprop="url"]');
            return Array.from(linkSelector).map(link => link.href);
        });
    } catch (error) {
        console.error('Error extracting links:', error);
        await browser.close();
        return;
    }

    for (let link of links) {
        try {
            await page.goto(link, { waitUntil: 'domcontentloaded' });
            const language = await page.evaluate(() => {
                const languageElement = document.querySelector('span[itemprop="inLanguage"]');
                return languageElement ? languageElement.textContent : "Unknown";
            });

            const [originalSong, album] = await page.evaluate(() => {
                const titleElement = document.querySelector('h1[itemprop="name"]');
                const albumElement = document.querySelector('a[itemprop="inAlbum"]');
                return [
                    titleElement ? titleElement.textContent.trim() : "",
                    albumElement ? albumElement.textContent.trim() : "",
                ];
            });

            const key = `${originalSong} (${album})`;
            let songObject = jsonData[key];
            if (songObject) {
                for (let country in songObject.covers) {
                    songObject.covers[country].details.forEach((detail) => {
                        detail.language = language; // 添加语言信息
                    });
                }
            }
        } catch (error) {
            console.error('Error processing link:', link, error);
            continue;
        }
    }

    await browser.close();

    fs.writeFileSync(
        path.join(__dirname, "updated_data.json"),
        JSON.stringify(jsonData, null, 2)
    );
}

scrapeData();
