var Prefs = (function () {
  // @include "lib/ArrayEx.js"
  // @include "lib/FileEx.js"
  // @include "lib/FolderEx.js"
  // @include "lib/Os.js"
  // @include "lib/StringEx.js"

  var module = {};

  var MAP = {
    PREF_Type_MACHINE_INDEPENDENT: '*-indep-general*',
    PREF_Type_MACHINE_INDEPENDENT_COMPOSITION: '*-indep-composition*',
    PREF_Type_MACHINE_INDEPENDENT_OUTPUT: '*-indep-output*',
    PREF_Type_MACHINE_INDEPENDENT_RENDER: '*-indep-render*',
    PREF_Type_MACHINE_SPECIFIC: 'Prefs*',
    PREF_Type_MACHINE_SPECIFIC_PAINT: '*-paint*',
    PREF_Type_MACHINE_SPECIFIC_TEXT: '*-text*',
  };

  module.getFile = function (PREFType) {
    app.preferences.saveToDisk();

    var files = module.getFiles(PREFType);
    files.sort(sortByDate);

    return files[0];
  };

  module.getFiles = function (PREFType) {
    var folder = module.getFolder();
    if (!folder.exists) {
      throw new Error('Preferences folder does not exist at path ' + folder.fsName);
    }

    var filter = getFilter(PREFType);
    var files = folder.getFiles(filter);
    if (files.length === 0) {
      throw new Error(
        'Could not find files with filter "' +
          filter +
          '" in Preferences folder at path ' +
          folder.fsName
      );
    }

    return files;
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
    var version = app.version.split('x')[0];
    if (version === '22.6.4') return version; // One time bug introduced by Adobe

    var items = version.split('.');
    var major = items[0];
    var minor = items[1] || 0;
    var patch = items[2] || 0;

    return [major, minor].join('.');
  }

  function getFilter(PREFType) {
    PREFType = PREFType || 'PREF_Type_MACHINE_SPECIFIC';

    if (!MAP.hasOwnProperty(PREFType)) {
      throw new Error('PREFType ' + PREFType + ' does not exist');
    }

    return MAP[PREFType];
  }

  function getRootFolder() {
    return Os.isWindows() ? Folder.userData.fsName : Folder.userData.parent.fsName + '/Preferences';
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
          throw new Error('Could not parse key-value from line\n' + line);
        }

        var key = StringEx.unquote(match[1]);
        var value = StringEx.unquote(match[3]);

        json[section][key] = value;
      }
    });
    return json;
  }
})();
