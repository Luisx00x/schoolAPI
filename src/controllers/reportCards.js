const puppeteer = require('puppeteer');

const genPDF = async (req, res, next) =>{

  try{

    const { url } = req.body;
  
    if(!url) return res.status(400).json("No hay url");

    const pdfBuffer = await generatePDF({url: url})
  
    return res.status(200).end(pdfBuffer);
  
  }catch(err){
    console.error(err);
    next(err);
  }

}

async function generatePDF({
  url,
}){
  
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: 750,
      height: 500,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    },
    executablePath: ""
  });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0"
  });

  await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {left: "0.5cm", top:"2cm", right:"0.5cm", bottom: "2cm"}
  });
  
  await browser.close();
  
}

module.exports = {
  genPDF
}