const puppeteer = require('puppeteer')

const getPageMetrics = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()

  console.time('okchem')
  await page.goto('https://www.okchem.com')
  console.timeEnd('okchem')

  const perf = await page.evaluate(_ => {
    const { loadEventEnd, navigationStart } = performance.timing
    return ({
      loadTime: loadEventEnd - navigationStart
    })
  })

  console.log(`page load took: ${perf.loadTime} ms`)

  await browser.close()
}

getPageMetrics()