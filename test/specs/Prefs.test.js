(function () {
  // @include "../lib/probe/Probe.js"
  // @include "../../Prefs.js"

  Probe.test('Should get folder name based on app.isBeta flag', function () {
    var isBeta = true;
    Probe.expect(Prefs.getAppName(isBeta)).toBe('After Effects (Beta)');
    Probe.expect(Prefs.getAppName(!isBeta)).toBe('After Effects');
  });

  Probe.test('Should get folder name based on app.version', function () {
    Probe.expect(Prefs.getAppVersion('22.6.4x3')).toBe('22.6.4');
    Probe.expect(Prefs.getAppVersion('23.2.1x3')).toBe('23.2');
  });

  Probe.test('Should get root folder (OS specific)', function () {
    if (isWindows()) {
      Probe.expect(Prefs.getRootFolder(isWindows()).fsName).toMatch(
        /\\AppData\\Roaming$/
      );
    } else {
      Probe.expect(Prefs.getRootFolder(isWindows()).fsName).toEndWith(
        '/Library/Preferences'
      );
    }
  });

  Probe.test('Should get Prefs folder (OS specific)', function () {
    var isBeta = true;
    var appVersion = '23.2.1x3';

    if (isWindows()) {
      Probe.expect(
        Prefs.getFolder(isWindows(), isBeta, appVersion).fsName
      ).toMatch(/\\AppData\\Roaming\\Adobe\\After Effects \(Beta\)\\23.2$/);

      Probe.expect(
        Prefs.getFolder(isWindows(), !isBeta, appVersion).fsName
      ).toMatch(/\\AppData\\Roaming\\Adobe\\After Effects\\23.2$/);
    } else {
      Probe.expect(
        Prefs.getFolder(isWindows(), isBeta, appVersion).fsName
      ).toEndWith('/Library/Preferences/Adobe/After Effects (Beta)/23.2');

      Probe.expect(
        Prefs.getFolder(isWindows(), !isBeta, appVersion).fsName
      ).toEndWith('/Library/Preferences/Adobe/After Effects/23.2');
    }
  });

  Probe.test('Prefs folder should exist', function () {
    Probe.expect(Prefs.getFolder().exists).toBe(true);
  });

  Probe.test(
    'Should get preference file based on provided PREF_Type',
    function () {
      var PREF_Types = Prefs.getSupportedPrefTypes();
      for (var i = 0, il = PREF_Types.length; i < il; i++) {
        Probe.expect(Prefs.getFile(PREF_Types[i]).exists).toBe(true);
      }
    }
  );

  Probe.saveLog(
    File($.fileName).parent.fsName + '/' + File($.fileName).displayName + '.log'
  );

  ///

  function isWindows() {
    return $.os.indexOf('Windows') !== -1;
  }
})();
