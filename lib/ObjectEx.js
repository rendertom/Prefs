var ObjectEx = (function () {
  var module = {};

  module.keys = function (object) {
    var keys = [];
    for (var key in object) {
      if (!object.hasOwnProperty(key)) continue;
      keys.push(key);
    }
    return keys;
  };

  return module;
})();
