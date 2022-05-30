var ArrayEx = (function () {
  var module = {};

  module.forEach = function (array, callback) {
    for (var i = 0, il = array.length; i < il; i++) {
      callback(array[i], i, array);
    }
  };

  return module;
})();
