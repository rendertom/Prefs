var ArrayEx = (function () {
  var module = {};

  module.forEach = function (array, callback) {
    for (var i = 0, il = array.length; i < il; i++) {
      callback(array[i], i, array);
    }
  };

  module.map = function (array, callback) {
    var result = [];
    for (var i = 0, il = array.length; i < il; i++) {
      result.push(callback(array[i], i, array));
    }
    return result;
  };

  return module;
})();
