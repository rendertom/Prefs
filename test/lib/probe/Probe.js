var Probe = (function Probe() {
  // @include "./lib/ArrayEx.js"
  // @include "./lib/FileEx.js"
  // @include "./lib/json2.js"
  // @include "./lib/Logger.js"
  // @include "./lib/StringEx.js"

  // @include "./model/CacheModel.js"
  // @include "./model/CaseModel.js"
  // @include "./model/ResultModel.js"
  // @include "./model/TestModel.js"

  var _cache = new CacheModel();
  var module = {};

  module.exception = function (exception) {
    _cache.getLastTestModel().addException(exception);
  };

  module.expect = function (actual) {
    var caseModel = new CaseModel(actual);
    _cache.getLastTestModel().addCase(caseModel);

    return {
      /**
       * expect the actual value to be === to the expected value.
       * @param {string|number} expected
       */
      toBe: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual === expected);
        caseModel.setOperator('===');
      },

      /**
       * expect the actual value to be !== to the expected value.
       * @param {string|number} expected
       */
      notToBe: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual !== expected);
        caseModel.setOperator('!==');
      },

      /**
       * expect the actual value to be greater than the expected value.
       * @param {number} expected
       */
      toBeGreaterThan: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual > expected);
        caseModel.setOperator('>');
      },

      /**
       * expect the actual value to be greater than or equal to the expected value.
       * @param {number} expected
       */
      toBeGreaterThanOrEqual: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual >= expected);
        caseModel.setOperator('>=');
      },

      /**
       * expect the actual value to be less than the expected value.
       * @param {number} expected
       */
      toBeLessThan: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual < expected);
        caseModel.setOperator('<');
      },

      /**
       * expect the actual value to be less than or equal to the expected value.
       * @param {number} expected
       */
      toBeLessThanOrEqual: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual <= expected);
        caseModel.setOperator('<=');
      },

      /**
       * expect the actual value to end with the expected value.
       * @param {string} expected
       */
      toEndWith: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(StringEx.endsWith(actual, expected));
        caseModel.setOperator('{actual} endsWith {expected}');
      },

      /**
       * expect the actual value to be == to the expected value.
       * @param {string|number} expected
       */
      toEqual: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual == expected);
        caseModel.setOperator('==');
      },

      /**
       * expect the actual value to be != to the expected value.
       * @param {string|number} expected
       */
      notToEqual: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(actual != expected);
        caseModel.setOperator('!=');
      },

      /**
       * expect the actual value to match a regular expression.
       * @param {string|RegExp} expected
       */
      toMatch: function (expected) {
        caseModel.setExpected(
          expected instanceof RegExp ? expected.source : expected
        );
        caseModel.setPass(expected.test(actual));
        caseModel.setOperator('{expected}.test({actual})');
      },

      /**
       * expect the actual value to start with the expected value.
       * @param {string} expected
       */
      toStartWith: function (expected) {
        caseModel.setExpected(expected);
        caseModel.setPass(StringEx.startsWith(actual, expected));
        caseModel.setOperator('{actual} startsWith {expected}');
      },
    };
  };

  module.getLog = function () {
    Logger.reset();
    Logger.log(_cache.getStatsFormated() + '\n');

    ArrayEx.forEach(_cache.getTestModels(), function (testModel) {
      if (testModel.hasExceptions()) {
        Logger.log(testModel.getName(), 'fail');
        ArrayEx.forEach(testModel.getExceptions(), function (exception) {
          Logger.log('Exception: ' + exception);
        });
      } else if (testModel.hasCases()) {
        Logger.log(
          testModel.getName(),
          testModel.hasFailedCases() ? 'fail' : 'success'
        );

        if (testModel.hasFailedCases()) {
          var failedCases = testModel.getFailedCases();
          ArrayEx.forEach(failedCases, function (caseModel, i) {
            Logger.log('Actual:   ' + JSON.stringify(caseModel.getActual()));
            Logger.log('Expected: ' + JSON.stringify(caseModel.getExpected()));
            var operator = caseModel.getOperator();
            if (operator) Logger.log('Operator: ' + operator);
            if (i !== failedCases.length - 1) Logger.log('-----');
          });
        }
      }
    });

    return Logger.get();
  };

  module.saveLog = function (file) {
    if (typeof file === 'undefined') {
      file = File($.fileName).parent.fsName + '/Logger.log';
    }

    FileEx.write(file, module.getLog());
  };

  module.test = function (name, callback) {
    try {
      _cache.add(new TestModel(name));
      callback && typeof callback === 'function' && callback();
    } catch (error) {
      module.exception(error.message);
    }
  };

  return module;

  ///
})();
