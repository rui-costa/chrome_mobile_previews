const puppeteer = require('puppeteer')
const devices = require('./devices')

class Previewer {
    // eslint-disable-next-line class-methods-use-this
    async getDevicePreview(url, deviceName) {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        const urlRegex = /.com\/.+/g
        const fileName = `img/Device_${deviceName}_Page_${url.match(urlRegex)[0].substring(5).replace(/\//g, '_')}.png`
        await page.emulate(puppeteer.devices[deviceName])
        await page.goto(url)
        await page.waitFor(10000)
        await page.screenshot({ path: fileName, fullPage: true })
        await browser.close()
    }

    // eslint-disable-next-line class-methods-use-this
    async asyncForEach(array, callback) {
        // eslint-disable-next-line
        for (let index = 0; index < array.length; index++) {
            // eslint-disable-next-line
            await callback(array[index], index, array);
        }
    }

    async getAllDevicesPreview(url) {
        await this.asyncForEach(devices, async (device) => {
            // eslint-disable-next-line no-console
            console.time(device.name)
            await this.getDevicePreview(url, device.name)
            // eslint-disable-next-line no-console
            console.timeEnd(device.name)
        })
    }
}

module.exports = Previewer
