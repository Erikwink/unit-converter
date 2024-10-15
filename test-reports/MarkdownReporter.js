/* eslint-disable jsdoc/require-jsdoc */
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class MarkdownReporter {
  onRunComplete (_, results) {
    const reportLines = []

    // Markdown header
    reportLines.push('# Test Report\n')
    reportLines.push(`**Total Tests**: ${results.numTotalTests}\n`)
    reportLines.push(`**Passed Tests**: ${results.numPassedTests}\n`)
    reportLines.push(`**Failed Tests**: ${results.numFailedTests}\n`)
    reportLines.push(`**Skipped Tests**: ${results.numPendingTests}\n`)
    reportLines.push('\n')

    const rootDirectory = process.cwd()

    results.testResults.forEach(suite => {
      const relativePath = path.relative(rootDirectory, suite.testFilePath)

      // Add a table header for the test suite
      reportLines.push(`## Test Suite: ${relativePath}\n`)
      reportLines.push('| Test | Status | Duration |\n')
      reportLines.push('|------|--------|----------|\n')

      // Add rows for each test case in the suite
      suite.testResults.forEach(test => {
        const status = test.status === 'passed' ? '✔️ Passed' : '❌ Failed'
        const duration = `${test.duration || 'N/A'}ms`
        reportLines.push(`| ${test.title} | ${status} | ${duration} |\n`)
      })

      // Add a blank line between tables
      reportLines.push('\n')
    })

    // Write the Markdown report to the directory
    const report = reportLines.join('')
    const reportDirectory = path.join(__dirname, 'reports')

    // Ensure the directory exists
    if (!fs.existsSync(reportDirectory)) {
      fs.mkdirSync(reportDirectory)
    }

    // Write the report file
    fs.writeFileSync(path.join(reportDirectory, 'test-report.md'), report)
  }
}

export default MarkdownReporter
