(function () {
  // @include "../Prefs.js"

  // Case 1. Get Preferences folder
  var folder = Prefs.getFolder();
  // /Users/tomas/Library/Preferences/Adobe/After Effects/22.4

  // Case 2. Get file object assotiated with PREF_Type_MACHINE_INDEPENDENT type
  var file = Prefs.getFile('PREF_Type_MACHINE_INDEPENDENT');
  // /Users/tomas/Library/Preferences/Adobe/After Effects/22.4/Adobe After Effects 22.4 Prefs-indep-general.txt

  // Case 3. Get contents of a file, assotiated with PREF_Type_MACHINE_INDEPENDENT_COMPOSITION type, as JSON
  var json = Prefs.getJson('PREF_Type_MACHINE_INDEPENDENT_COMPOSITION');
  // {
  //   "Composition Pref Section": {
  //     "4up Column Width (0.0 <= val <= 1.0)": "0.300000",
  //     "4up Row Height (0.0 <= val <= 1.0)": "0.350000",
  //     "Default Comp Layout 2D Only": "0",
  //     "Default Comp Layout Mixed 2D / 3D": "0"
  //   }
  // }

  // Case 4. Get Label colors and names
  var json = Prefs.getJson('PREF_Type_MACHINE_INDEPENDENT');
  var result = {
    colors: json['Label Preference Color Section 5'],
    names: json['Label Preference Text Section 7'],
  };
  // {
  //   "colors": {
  //     "Label Color ID 2 # 1": "FFF50101",
  //     "Label Color ID 2 # 10": "FF8E\",\"9A",
  //     "Label Color ID 2 # 11": "FFE8920D",
  //     "Label Color ID 2 # 12": "FF7F\"E*\"",
  //     "Label Color ID 2 # 13": "FFF4\"m\"D6",
  //     "Label Color ID 2 # 14": "FF\"=\"A2A5",
  //     "Label Color ID 2 # 15": "FFA896\"w\"",
  //     "Label Color ID 2 # 16": "FF1E\"@\"1E",
  //     "Label Color ID 2 # 2": "FFE4D8\"L\"",
  //     "Label Color ID 2 # 3": "FFA9CBC7",
  //     "Label Color ID 2 # 4": "FFE5BCC9",
  //     "Label Color ID 2 # 5": "FFA9A9CA",
  //     "Label Color ID 2 # 6": "FFE7C19E",
  //     "Label Color ID 2 # 7": "FFB3C7B3",
  //     "Label Color ID 2 # 8": "FF\"g}\"E0",
  //     "Label Color ID 2 # 9": "FF\"J\"A4\"L\""
  //   },
  //   "names": {
  //     "Label Text ID 2 # 1": "Red",
  //     "Label Text ID 2 # 10": "Purple",
  //     "Label Text ID 2 # 11": "Orange",
  //     "Label Text ID 2 # 12": "Brown",
  //     "Label Text ID 2 # 13": "Fuchsia",
  //     "Label Text ID 2 # 14": "Cyan",
  //     "Label Text ID 2 # 15": "Sandstone",
  //     "Label Text ID 2 # 16": "Dark Green",
  //     "Label Text ID 2 # 2": "Yellow",
  //     "Label Text ID 2 # 3": "Aqua",
  //     "Label Text ID 2 # 4": "Pink",
  //     "Label Text ID 2 # 5": "Lavender",
  //     "Label Text ID 2 # 6": "Peach",
  //     "Label Text ID 2 # 7": "Sea Foam",
  //     "Label Text ID 2 # 8": "Blue",
  //     "Label Text ID 2 # 9": "Green"
  //   }
  // }
})();
