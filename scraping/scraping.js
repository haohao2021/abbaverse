const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

let rawData = fs.readFileSync(path.join(__dirname, "../public/data.json"));
let jsonData = JSON.parse(rawData);

async function scrapeData() {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "--disable-extensions-except=/path/to/manifest/folder/",
            "--load-extension=/path/to/manifest/folder/",
        ],
    }); 
    const page = await browser.newPage();
    await page.goto(
        "https://secondhandsongs.com/artist/119/originals#nav-entity"
    );
    // await page.waitForSelector("button.fc-button.fc-cta-consent", { timeout: 10000 }); // 等待同意按钮出现
    // await page.click("button.fc-button.fc-cta-consent"); // 点击同意按钮

    // 获取所有曲目的链接
    const links = await page.evaluate(() => {
        const linkSelector = document.querySelectorAll(
            'table tbody tr td a[itemprop="url"]'
        );
        return Array.from(linkSelector).map((link) => link.href);
    });

    // 遍历每个链接，获取语言信息
    for (let link of links) {
        await page.goto(link);
        const language = await page.evaluate(() => {
            const languageElement = document.querySelector(
                'span[itemprop="inLanguage"]'
            );
            return languageElement ? languageElement.textContent : "Unknown";
        });

        // 提取歌名和专辑名
        const [originalSong, album] = await page.evaluate(() => {
            const titleElement = document.querySelector('h1[itemprop="name"]');
            const albumElement = document.querySelector(
                'a[itemprop="inAlbum"]'
            );
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
    }

    await browser.close();

    // 保存更新后的 JSON 数据
    fs.writeFileSync(
        path.join(__dirname, "updated_data.json"),
        JSON.stringify(jsonData, null, 2)
    );
}

scrapeData();
