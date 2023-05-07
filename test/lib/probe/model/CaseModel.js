/**
 * @class
 * @param {string|number} [actual]
 * @property {string|number} actual
 * @property {string|number} expected
 * @property {string} operator
 * @property {boolean} pass
 */
function CaseModel(actual) {
  this.actual = actual;
  this.expected;
  this.operator;
  this.pass = false;
}

/**
 * @returns {string|number}
 */
CaseModel.prototype.getActual = function () {
  return this.actual;
};

/**
 * @returns {string|number}
 */
CaseModel.prototype.getExpected = function () {
  return this.expected;
};

/**
 * @returns {string}
 */
CaseModel.prototype.getOperator = function() {
  return this.operator || '';
}

/**
 * @returns {boolean}
 */
CaseModel.prototype.getPass = function () {
  return this.pass;
};

/**
 * @param {string|number} actual
 */
CaseModel.prototype.setActual = function (actual) {
  this.actual = actual;
};

/**
 * @param {string|number} expected
 */
CaseModel.prototype.setExpected = function (expected) {
  this.expected = expected;
};

/**
 * @param {string} operator 
 */
CaseModel.prototype.setOperator = function(operator) {
  this.operator = operator;
}

/**
 * @param {Boolean} pass
 */
CaseModel.prototype.setPass = function (pass) {
  this.pass = pass;
};
