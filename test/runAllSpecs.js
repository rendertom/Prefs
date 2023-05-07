(function () {
  var folder = new Folder(File($.fileName).parent.fsName + '/specs');
  if (!folder.exists) {
    return alert('Specs folder does not exist');
  }

  var files = folder.getFiles(function (file) {
    return file.displayName.match(/\.jsx?$/);
  });

  if (files.length === 0) {
    return alert("Cound not find any '*.js' or '*.jsx' files in Specs folder");
  }

  var counter = 0;
  for (var i = 0, il = files.length; i < il; i++) {
      $.evalFile(files[i]);
      counter++;
  }

  alert(counter + ' tests executed');
})();
