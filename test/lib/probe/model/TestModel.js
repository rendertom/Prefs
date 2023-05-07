/**
 * @class
 * @param {string} [name] - A test case name, i.e. description
 * @property {string} name
 * @property {string[]} exceptions
 * @property {CaseModel[]} cases
 */
function TestModel(name) {
  this.name = name || '';
  this.exceptions = [];
  this.cases = [];
}

/**
 * @param {CaseModel} caseModel
 */
TestModel.prototype.addCase = function (caseModel) {
  this.cases.push(caseModel);
};

/**
 * @param {string} exception
 */
TestModel.prototype.addException = function (exception) {
  this.exceptions.push(exception);
};

/**
 * @returns {CaseModel[]}
 */
TestModel.prototype.getCases = function () {
  return this.cases || [];
};

/**
 * @returns {string[]}
 */
TestModel.prototype.getExceptions = function () {
  return this.exceptions || [];
};

/**
 * @returns {CaseModel[]}
 */
TestModel.prototype.getFailedCases = function () {
  var cases = this.getCases();
  var result = [];
  for (var i = 0, il = cases.length; i < il; i++) {
    if (!cases[i].getPass()) result.push(cases[i]);
  }
  return result;
};

/**
 * @returns {string}
 */
TestModel.prototype.getName = function () {
  return this.name || '';
};

/**
 * @returns {CaseModel[]}
 */
TestModel.prototype.getPassedCases = function () {
  var cases = this.getCases();
  var result = [];
  for (var i = 0, il = cases.length; i < il; i++) {
    if (cases[i].getPass()) result.push(cases[i]);
  }
  return result;
};

/**
 * @returns {boolean}
 */
TestModel.prototype.hasCases = function () {
  return this.cases && this.cases.length > 0;
};

/**
 * @returns {boolean}
 */
TestModel.prototype.hasExceptions = function () {
  return this.exceptions && this.exceptions.length > 0;
};

/**
 * @returns {boolean}
 */
TestModel.prototype.hasFailedCases = function () {
  var cases = this.getCases();
  for (var i = 0, il = cases.length; i < il; i++) {
    if (!cases[i].getPass()) return true;
  }
  return false;
};
