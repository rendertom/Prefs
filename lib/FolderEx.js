var FolderEx = (function () {
  var module = {};

  module.getFolderObject = function (folder) {
    return folder instanceof Folder ? folder : new Folder(folder);
  };

  return module;
})();
