export default {
  transform: {
    '^.+\\.js$': 'babel-jest' // Use babel-jest for JavaScript files
  },
  testEnvironment: 'node',
  reporters: [
    'default',
    './test-reports/MarkdownReporter.js'
  ]
}
