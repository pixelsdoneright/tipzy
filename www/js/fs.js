var TIPZY_CONFIG_FILE = "tipzycfg";
var fs = {};
var fe = {};
var tfile = {};
var fmode = "r";

var initFs = function() {
    console.log("Requesting FileSystem access.");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
};

var gotFileSystem = function(f) {
    fs = f;
    console.log("Got FileSystem access.");
    console.log("fs name ===================> " + f.name);
    console.log("fs root ===================> " + f.root);
    loadConfig(f);
};

var loadConfig = function(fsys) {
    if ($scope.config && $scope.config.length < 1) {
        Log.info("Loading config...");
        getFileForReading(fsys, TIPZY_CONFIG_FILE);
    }
};
var getFileForReading = function(fs, filename) {
    console.log("Looking for the file - " + filename + ".");
    fs.root.getFile(filename, {
        create: true
    }, gotFileForReading, fail);
};

var gotFileForReading = function(fileEntry) {
    console.log("Got the file - " + fileEntry.fullPath + ".");
    fe = fileEntry;
    fe.file(readFile, fail);
};

var readFile = function(file) {
    tfile = file;
    var reader = new FileReader();
    reader.onloadend = fileReadComplete;
    reader.readAsText(file);
};

var fileReadComplete = function(event) {
    console.log(JSON.stringify(event.target));
    if (event.target.result == "null" || event.target.result == "") {
        console.log("Writing data to file as empty file found.");
        writeFile({
            currency: '$',
            tip1: '0.0',
            tip2: "10.0",
            tip3: "12.0",
            tip4: "15.0"
        });
    } else {
        $scope.safeApply(function() {
            console.log("Updating file");
            $scope.config = angular.fromJson(event.target.result);
            console.log("Updated file" + $scope.config);
        });
    }
};

var writeFile = function(d) {
    data = d;
    fe.createWriter(writeDataToFile, fail);
};

var writeDataToFile = function(writer) {
    writer.onwrite = function(evt) {
        console.log("File Write successful - " + writer.length + " kb.");
        getFileForReading(fs, TIPZY_CONFIG_FILE);
    };

    writer.seek((fmode == "r") ? 0 : writer.length)
    writer.write(data);
};

var fail = function(errorevent) {
    console.log(Utils.echo(errorevent));
};