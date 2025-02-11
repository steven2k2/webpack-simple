/* eslint-env mocha */
import fs from 'fs-extra'
import path from 'path'
import { expect } from 'chai'
import { fileURLToPath } from 'url'

// Fixes __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Build Output', function () {
  const distPath = path.resolve(__dirname, '../dist')
  const htmlFile = path.join(distPath, 'index.html')

  it('should generate index.html in the dist folder', function () {
    expect(fs.existsSync(htmlFile)).to.be.true
  })

  it('should contain expected content from Handlebars', function () {
    const htmlContent = fs.readFileSync(htmlFile, 'utf8')
    expect(htmlContent).to.include('<title>Welcome to My Website</title>')
    expect(htmlContent).to.include('Bootstrap 5 + Handlebars')
    expect(htmlContent).to.include('Get Started')
  })
})
