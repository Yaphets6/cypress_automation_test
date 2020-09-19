const cypress = require('cypress')
const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

/**
 * 定义报告合并参数
 */
const report_opt = {
  files:['./test_reports/*.json'],
  reportDir:"./test_reports",
  reportFilename: "ui_auto_test_reoprt",
  timestamp:"isoDateTime"
}

/**
 * 指定要执行的用例
 */
const run_opt = {
  spec:''
}

async function runCase() {
  await fse.remove('test_reports')
  const { totalFailed } = await cypress.run()
  const jsonReport = await merge(report_opt)
  await generator.create(jsonReport,report_opt)
  process.exit(totalFailed)
}

runCase()