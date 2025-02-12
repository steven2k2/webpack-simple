import { assert } from 'chai'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

// Fixes __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Build Output', function () {
  const distPath = path.resolve(__dirname, '../dist')
  const htmlFile = path.join(distPath, 'index.html')

  it('should generate index.html in the dist folder', function () {
    const fileExists = fs.existsSync(htmlFile)
    assert.isTrue(fileExists, 'index.html was not generated in the dist folder')
  })

  it('should contain expected content from Handlebars', function () {
    let htmlContent
    try {
      htmlContent = fs.readFileSync(htmlFile, 'utf8')
    } catch (err) {
      throw new Error(`Failed to read index.html: ${err.message}`)
    }

    assert.isString(htmlContent, 'index.html is empty or not readable')
    assert.include(htmlContent, '<title>Welcome to My Website</title>', 'Missing title in index.html')
    assert.include(htmlContent, 'Bootstrap 5 + Handlebars', 'Missing hero title in index.html')
    assert.include(htmlContent, 'Get Started', 'Missing CTA text in index.html')
  })
})
