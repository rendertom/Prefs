/**
 * @class
 * @property {number} numCases
 * @property {number} numCasesFailed
 * @property {number} numCasesPassed
 * @property {number} numTests
 * @property {number} numTestsFailed
 * @property {number} numTestsPassed
 * @property {boolean} testPass
 */
function ResultModel() {
  this.numCases = 0;
  this.numCasesFailed = 0;
  this.numCasesPassed = 0;
  this.numTests = 0;
  this.numTestsFailed = 0;
  this.numTestsPassed = 0;
  this.testPassed = false;
}
