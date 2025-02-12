# Webpack Simple

## Overview
This is a modern, modular, and optimised Webpack setup that includes:
- **Handlebars for templating**
- **SCSS for styling**
- **Bootstrap for UI components**
- **Linting with StandardJS**
- **Testing with Mocha & Chai**
- **Live reload for development**

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/steven2k2/webpack-simple.git
cd webpack-simple
npm install
```

---

## Usage

### **Start the Development Server**
Run the following command to start the Webpack dev server with live reload:

```bash
npm start
```
This will:
- Compile assets
- Serve the site from `dist/`
- Open the browser automatically
- Watch for file changes and reload the page

---

## Build for Production
To generate an optimised production build:

```bash
npm run build
```
This will:
- Clean the `dist/` directory
- Minify JS, CSS, and HTML
- Generate hashed filenames for cache busting

---

## Code Quality: Linting

This project uses **StandardJS** to enforce code style.

### **Run Linting**
To check the project for style issues:
```bash
npm run lint
```

### **Auto-Fix Issues**
```bash
npm run lint -- --fix
```

#### **What StandardJS Checks**
- Consistent spacing and formatting
- Unused variables
- Correct ESM import/export usage
- Avoids semicolons (StandardJS style)

Linting **runs before tests** to prevent errors from breaking builds.

---

## Testing

### **Run Tests**
```bash
npm test
```
This will:
1. **Lint the code** (`npm run lint`)
2. **Build the project** (`npm run build`)
3. **Run Mocha tests** on the generated `dist/index.html`

### **Test Framework**
- **Mocha** for running tests
- **Chai (assert style)** for assertions
- **fs-extra** for checking generated files

### **Example Test**
The test suite verifies:
- `index.html` is generated
- The page contains expected Handlebars content

Example:
```js
import { assert } from 'chai'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

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
    const htmlContent = fs.readFileSync(htmlFile, 'utf8')
    assert.include(htmlContent, '<title>Welcome to My Website</title>', 'Missing title')
  })
})
```

---

## Project Structure
```
webpack-simple/
│── dist/                 # Compiled output (not committed)
│── src/                  # Source files
│   ├── js/               # JavaScript entry
│   ├── scss/             # SCSS styles
│   ├── templates/        # Handlebars templates
│── test/                 # Test files
│── webpack.config.js     # Webpack configuration
│── package.json          # Project metadata & scripts
│── .eslintrc.json        # StandardJS linting rules
│── .gitignore            # Ignored files
```

---

This project follows [Standard JS](https://standardjs.com/).

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
