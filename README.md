# Prefs

The utility class for Adobe After Effects to get preferences as files or JSON objects.

## But... why?

From the AE docs:

> The [Preferences object](https://ae-scripting.docsforadobe.dev/other/preferences.html) provides a way to manage internal AE preferences, such as you’d find in AE’s Preferences menu. These are saved in the After Effects preference files and are persistent between application sessions.

However, not all of the preference values are available using the `app.preferences.getPrefAsString()` methods. One of them is Label colors (_Label Preference Color Section 5_).

For instance, if you want to get a label color, you'd be running the following command:

`app.preferences.getPrefAsString('Label Preference Color Section 5', 'Label Color ID 2 # 1', PREFType.PREF_Type_MACHINE_INDEPENDENT)`

However, this would return either gibberish or even throw an error, complaining about Unicode characters.

This is where **Prefs** class comes into play.

## API

- `getFile(PREFType)` - get file object associated with a provided PREFType type. `PREFType` one of
  - `PREF_Type_MACHINE_SPECIFIC`: Adobe After Effects $versionNumber.x Prefs.txt
  - `PREF_Type_MACHINE_INDEPENDENT`: Adobe After Effects $versionNumber.x Prefs-indep-general.txt
  - `PREF_Type_MACHINE_INDEPENDENT_RENDER`: Adobe After Effects $versionNumber.x Prefs-indep-render.txt
  - `PREF_Type_MACHINE_INDEPENDENT_OUTPUT`: Adobe After Effects $versionNumber.x Prefs-indep-output.txt
  - `PREF_Type_MACHINE_INDEPENDENT_COMPOSITION`: Adobe After Effects $versionNumber.x Prefs-indep-composition.txt
  - `PREF_Type_MACHINE_SPECIFIC_TEXT`: Adobe After Effects $versionNumber.x Prefs-text.txt
  - `PREF_Type_MACHINE_SPECIFIC_PAINT`: Adobe After Effects $versionNumber.x Prefs-paint.txt
- `getFiles(PREFType)` - get an array of file objects associated with a provided PREFType type.
- `getFolder()` - get Preferences folder.
- `getJson(PREFType)` - get contents of a file, assotiated with PREFType type, as JSON object.

## Usage

Download the repository and include the class in your main script.

```javascript
// Include the class
#include 'Prefs.js'
```

### Case 1

```javascript
// Get Preferences folder
var folder = Prefs.getFolder();

// /Users/tomas/Library/Preferences/Adobe/After Effects/22.4
```

### Case 2

```javascript
// Get file object assotiated with PREF_Type_MACHINE_INDEPENDENT type
var file = Prefs.getFile('PREF_Type_MACHINE_INDEPENDENT');

// /Users/tomas/Library/Preferences/Adobe/After Effects/22.4/Adobe After Effects 22.4 Prefs-indep-general.txt
```

### Case 3

```javascript
// Get contents of a file, assotiated with PREF_Type_MACHINE_INDEPENDENT_COMPOSITION type, as JSON
var json = Prefs.getJson('PREF_Type_MACHINE_INDEPENDENT_COMPOSITION');

// {
//   "Composition Pref Section": {
//     "4up Column Width (0.0 <= val <= 1.0)": "0.300000",
//     "4up Row Height (0.0 <= val <= 1.0)": "0.350000",
//     "Default Comp Layout 2D Only": "0",
//     "Default Comp Layout Mixed 2D / 3D": "0"
//   }
// }
```

### Case 4

```javascript
// Get Label colors and names
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
```

## Limitations

Requires Adobe After Effects CC (v12.0) and newer.
