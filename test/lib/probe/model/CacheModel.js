/**
 * @class
 * @property {TestModel[]} testModel
 */
function CacheModel() {
  this.testModels = [];
}

/**
 * @param {TestModel} testModel
 */
CacheModel.prototype.add = function (testModel) {
  this.testModels.push(testModel);
};

/**
 * @returns {TestModel}
 * @throws {TypeError} Throws an error if CacheModel is empty
 */
CacheModel.prototype.getLastTestModel = function () {
  if (this.isEmpty()) throw new TypeError('CacheModel is empty');
  var testModels = this.getTestModels();
  return testModels[testModels.length - 1];
};

/**
 * @returns {ResultModel}
 */
CacheModel.prototype.getStats = function () {
  var result = new ResultModel();

  var testModels = this.getTestModels();
  for (var i = 0, il = testModels.length; i < il; i++) {
    var testModel = testModels[i];

    var failedCases = testModel.getFailedCases();
    var passedCases = testModel.getPassedCases();
    var hasExceptions = testModel.hasExceptions();

    result.numCases += testModel.getCases().length;
    result.numCasesFailed += failedCases.length;
    result.numCasesPassed += passedCases.length;

    result.numTests++;
    result.numTestsFailed += failedCases.length > 0 || hasExceptions;
    result.numTestsPassed += failedCases.length === 0 && !hasExceptions;
  }

  result.testPassed = result.numCasesFailed + result.numTestsFailed === 0;

  return result;
};

/**
 * @returns {string}
 */
CacheModel.prototype.getStatsFormated = function () {
  var stats = this.getStats();

  return [
    'Pass: {testPass},',
    '{numTests} tests ({numTestsPassed} passed, {numTestsFailed} failed),',
    '{numCases} cases ({numCasesPassed} passed, {numCasesFailed} failed)',
  ]
    .join('\n')
    .replace('{testPass}', stats.testPassed)
    .replace('{numTests}', stats.numTests)
    .replace('{numTestsPassed}', stats.numTestsPassed)
    .replace('{numTestsFailed}', stats.numTestsFailed)
    .replace('{numCases}', stats.numCases)
    .replace('{numCasesPassed}', stats.numCasesPassed)
    .replace('{numCasesFailed}', stats.numCasesFailed);
};

/**
 * @returns {TestModel[]}
 */
CacheModel.prototype.getTestModels = function () {
  return this.testModels || [];
};

/**
 * @returns {boolean}
 */
CacheModel.prototype.isEmpty = function () {
  return this.getTestModels().length === 0;
};
