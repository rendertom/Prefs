(function () {
  try {
    // @include "../../config/PREF_TO_FILTER.js"
    // @include "../config/PREF_TO_FILENAME.js"

    // @include "../lib/ArrayEx.js"
    // @include "../lib/ErrorHandler.js"
    // @include "../lib/FolderEx.js"
    // @include "../lib/ObjectEx.js"
    // @include "../lib/probe/Probe.js"

    ArrayEx.forEach(getPrefTypes(), function (PREF_Type) {
      var fileNames = getFileNames(PREF_Type);
      if (!fileNames) return;

      ArrayEx.forEach(ObjectEx.keys(fileNames), function (isoLanguage) {
        Probe.test(getTestName(PREF_Type, isoLanguage), function () {
          runTest(PREF_Type, isoLanguage);
        });
      });
    });

    alert(Probe.getLog());
    Probe.saveLog(
      File($.fileName).parent.fsName +
        '/' +
        File($.fileName).displayName +
        '.log'
    );

    ///

    function getFileName(PREF_Type, isoLanguage) {
      return getFileNames(PREF_Type)[isoLanguage];
    }

    function getFileNames(PREF_Type) {
      return PREF_TO_FILENAME[PREF_Type];
    }

    function getFilter(PREF_Type) {
      return PREF_TO_FILTER[PREF_Type];
    }

    function getPrefTypes() {
      return ObjectEx.keys(PREF_TO_FILTER);
    }

    function getMessage_folderDoesNotExist(isoLanguage, folder) {
      return 'Preference folder for testing "{language}" language does not exist at path "{folder}"'
        .replace('{language}', isoLanguage)
        .replace('{folder}', File(folder).fsName);
    }

    function getMessage_multipleFilesMatched(filter, isoLanguage) {
      return 'Filter "{filter}" matched multiple files for {language} language'
        .replace('{filter}', filter)
        .replace('{language}', isoLanguage);
    }

    function getMessage_noFilesMatched(filter, isoLanguage) {
      return 'Filter "{filter}" did not match any files for {language} language'
        .replace('{filter}', filter)
        .replace('{language}', isoLanguage);
    }

    function getTestName(PREF_Type, isoLanguage) {
      return '"{PREF_Type}" with filter "{filter}" should get "{fileName}" file for {language} language'
        .replace('{PREF_Type}', PREF_Type)
        .replace('{filter}', getFilter(PREF_Type))
        .replace('{fileName}', getFileName(PREF_Type, isoLanguage))
        .replace('{language}', isoLanguage);
    }

    function runTest(PREF_Type, isoLanguage) {
      var folder = FolderEx.getFolderObject(
        File($.fileName).parent.parent.fsName +
          '/preference files/' +
          isoLanguage
      );

      if (!folder.exists) {
        return Probe.exception(
          getMessage_folderDoesNotExist(isoLanguage, folder)
        );
      }

      var filter = getFilter(PREF_Type);
      var files = folder.getFiles(filter);
      if (files.length === 0) {
        return Probe.exception(getMessage_noFilesMatched(filter, isoLanguage));
      }

      if (files.length > 1) {
        return Probe.exception(
          getMessage_multipleFilesMatched(filter, isoLanguage)
        );
      }

      var expected = getFileName(PREF_Type, isoLanguage);
      Probe.expect(files[0].displayName).toBe(expected);
    }
  } catch (error) {
    ErrorHandler.show(error);
  }
})();
