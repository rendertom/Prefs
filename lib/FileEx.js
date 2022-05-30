var FileEx = (function () {
  var module = {};

  module.getFileObject = function (file) {
    return file instanceof File ? file : new File(file);
  };

  module.readFile = function (file, encoding) {
    file = module.getFileObject(file);
    encoding = encoding || 'UTF-8';

    if (!file.exists) {
      throw new Error('File does not exist at path ' + file.fsName);
    }

    if (!File.isEncodingAvailable(encoding)) {
      throw new Error(
        'Encoding ' + encoding + ' is not available for file ' + file.fsName
      );
    }

    file.encoding = encoding;
    file.open();
    var contents = file.read();
    file.close();

    return contents;
  };

  return module;
})();
