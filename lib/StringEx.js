var StringEx = (function () {
  var module = {};

  module.endsWith = function (string1, string2, length) {
    if (length === undefined || length > string1.length) {
      length = string1.length;
    }
		
    return string1.substring(length - string2.length, length) === string2;
  };

  module.forEachLine = function (string, callback) {
    ArrayEx.forEach(module.splitLines(string), function (line, i, lines) {
      callback(line, i, lines, string);
    });
  };

  module.splitLines = function (string) {
    return string.split(/\r?\n/);
  };

  module.startsWith = function (string1, string2, position) {
    position = typeof position === 'number' ? position : 0;
    return string1.substring(position, position + string2.length) === string2;
  };

  module.trim = function (string) {
    return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };

  module.unquote = function (string) {
    return module.startsWith(string, '"') && module.endsWith(string, '"')
      ? string.substring(1, string.length - 1)
      : string;
  };

  return module;
})();
