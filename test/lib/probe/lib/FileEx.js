var FileEx = (function () {
  var module = {};

  module.getFileObject = function (file) {
    return file instanceof File ? file : new File(file);
  };

  module.write = function (file, contents, encoding, openMode) {
    file = module.getFileObject(file);
    encoding = encoding || 'UTF-8';
    openMode = openMode || 'w'; // 'a', 'e', 'r', 'w';

    file.encoding = encoding;
    file.open(openMode);
    var success = file.write(contents);
    file.close();

    if (!success) {
      throw new Error('Unable to write file ' + file.fsName);
    }

    return file;
  };

  return module;
})();
