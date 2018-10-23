const puppeteer = require('puppeteer')

// 01:55 Now, something else we can do is replicate slower network conditions, and see how that affects our page load. We'll do await, page.wait for 1,000, and await page client send, network emulate network conditions.

// 02:10 Then we'll send an object, offline false, latency 200, downloading throughput 780 times 1024 divided by 8, upload 330 times 1024 divided by 8. Perfect. We're sending this dev tool protocol command, emulate network conditions, as well as an object that replicates the configuration of a 3G connection.

// 02:35 Then this page.wait for 1,000 is to make sure that our page's context has resolved completely before sending our network condition. Now, when we rerun our file, we'll notice that it takes much longer than before, and our load times are now in the 5,000 millisecond range.

const getPageMetrics = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  // // condition
  // await page.waitFor(1000)
  // await page._client_send('Network.emulateNetworkConditions', {
  //   offline: false,
  //   latency: 200,
  //   downloadThroughput: 780 * 1024 / 8,
  //   uploadThroughput: 330 * 1024 / 8
  // })

  console.time('okchem')
  await page.goto('https://www.made-in-china.com/')
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