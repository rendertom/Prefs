var Logger = (function Logger() {
  var _data = [];
  var module = {};

  module.get = function () {
    return _data.join('\n');
  };

  module.log = function (message, iconName) {
    message = appendIcon(message, iconName);
    _data.push(message);
  };

  module.reset = function () {
    _data = [];
  };

  return module;

  ///

  function appendIcon(message, icon) {
    var icons = {
      fail: '❌',
      success: '✅',
    };

    return icon && icons.hasOwnProperty(icon)
      ? icons[icon] + ' ' + message
      : message;
  }
})();
