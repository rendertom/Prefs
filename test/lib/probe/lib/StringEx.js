var StringEx = (function () {
  var module = {};

  module.endsWith = function (string1, string2, length) {
    if (length === undefined || length > string1.length) {
      length = string1.length;
    }
		
    return string1.substring(length - string2.length, length) === string2;
  };

  module.startsWith = function (string1, string2, position) {
    position = typeof position === 'number' ? position : 0;
    return string1.substring(position, position + string2.length) === string2;
  };

  return module;
})();
