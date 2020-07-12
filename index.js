const Previewer = require('./previewer')

const url = 'https://www.example.com'
const p = new Previewer()

// All devices output
// p.getAllDevicesPreview(url)

// Only Iphone X
p.getDevicePreview(url, 'iPhone X')
