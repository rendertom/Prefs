var Prefs = (function () {
  // @include "lib/ArrayEx.js"
  // @include "lib/FileEx.js"
  // @include "lib/FolderEx.js"
  // @include "lib/Os.js"
  // @include "lib/StringEx.js"

  var module = {};

  var MAP = {
    PREF_Type_MACHINE_INDEPENDENT: '*-indep-general.txt',
    PREF_Type_MACHINE_INDEPENDENT_COMPOSITION: '*-indep-composition.txt',
    PREF_Type_MACHINE_INDEPENDENT_OUTPUT: '*-indep-output.txt',
    PREF_Type_MACHINE_INDEPENDENT_RENDER: '*-indep-render.txt',
    PREF_Type_MACHINE_SPECIFIC: 'Prefs.txt',
    PREF_Type_MACHINE_SPECIFIC_PAINT: '*-paint.txt',
    PREF_Type_MACHINE_SPECIFIC_TEXT: '*-text.txt',
  };

  module.getFile = function (PREFType) {
    app.preferences.saveToDisk();

    var files = module.getFiles(PREFType);
    if (files.length === 0) {
      throw new Error('Could not find Preferences file');
    }

    files.sort(sortByDate);
    return files[0];
  };

  module.getFiles = function (PREFType) {
    return module.getFolder().getFiles(getFilter(PREFType));
  };

  module.getFolder = function () {
    return FolderEx.getFolderObject(
      getRootFolder() + '/Adobe/' + getAppName() + '/' + getAppVersion()
    );
  };

  module.getJson = function (PREFType) {
    return toJson(FileEx.readFile(module.getFile(PREFType)));
  };

  return module;

  ///

  function getAppName() {
    return app.isBeta ? 'After Effects (Beta)' : 'After Effects';
  }

  function getAppVersion() {
    return parseFloat(app.version).toFixed(1);
  }

  function getFilter(PREFType) {
    PREFType = PREFType || 'PREF_Type_MACHINE_SPECIFIC';

    if (!MAP.hasOwnProperty(PREFType)) {
      throw new Error('PREFType ' + PREFType + ' does not exist');
    }

    return 'Adobe After Effects ' + getAppVersion() + ' ' + MAP[PREFType];
  }

  function getRootFolder() {
    return Os.isWindows()
      ? Folder.userData.fsName
      : Folder.userData.parent.fsName + '/Preferences';
  }

  function isComment(string) {
    return StringEx.startsWith(string, '#');
  }

  function isSection(string) {
    return StringEx.startsWith(string, '[') && StringEx.endsWith(string, ']');
  }

  function joinMultiline(string) {
    return string.replace(/"*\\[\n|\r]\s*"?/g, '');
  }

  function sortByDate(f1, f2) {
    return f1.modified < f2.modified;
  }

  function toJson(string) {
    var json = {};
    var section;
    StringEx.forEachLine(joinMultiline(string), function (line) {
      line = StringEx.trim(line);

      if (isComment(line) || !line) return;
      if (isSection(line)) {
        section = line.replace(/["\[\]]/g, '');
        json[section] = {};
      } else {
        if (!section) throw new Error('Section not found');

        var match = line.match(/^(".*?")( = )(.*)/);
        if (!match || match.length !== 4) {
          throw new Error(
            'Could not parse key-value from line\n' + line
          );
        }

        var key = StringEx.unquote(match[1]);
        var value = StringEx.unquote(match[3]);

        json[section][key] = value;
      }
    });
    return json;
  }
})();
