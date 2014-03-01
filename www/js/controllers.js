var TIPZY_CONFIG_FILE = "tipzycfg";
var fs = {};
var fe = {};
var tfile = {};
var fmode = "r";

var origOffsetY = $('.sticky').offset().top;

function onLoad() {
    console.log('#$#$ INSIDE ONLOAD');
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener('scroll', onScroll);
}

// device APIs are available
//
function onDeviceReady() {
    console.log('#$#$ INSIDE deviceready: ' + JSON.stringify(navigator));

    navigator.globalization.getCurrencyPattern(
        'USD',
        function(pattern) {
            str = 'pattern: ' + pattern.pattern;

            navigator.notification.alert(
                str, // message
                function() {

                }, // callback
                'Game Over', // title
                'Done' // buttonName
            );
        },
        function(error) {
            navigator.notification.alert('Error getting pattern: ' + error);
        }
    );
}

function onScroll(e) {

    if(window.scrollY >= origOffsetY){
        $('.sticky').addClass('fixed');
        $('.sticky').append($('.split-blk'));
    }else{
        $('.sticky').removeClass('fixed');
    }

    
}

var cTip = function($scope) {
    $scope.tipsy = {};

    $scope.tipVal = '0.0';
    $scope.howTipsy = [{
        name: "Shitty",
        value: "0.0"
    }, {
        name: "Watevz",
        value: "0.10"
    }, {
        name: "Kewl",
        value: "0.12"
    }, {
        name: "Awesome",
        value: "0.15"
    }];
    $scope.howTipsy[0].state = "active";
    $scope.setActive = function(index) {
        for (i = 0; i < $scope.howTipsy.length; i++) {
            $scope.howTipsy[i].state = "";
        }
        $scope.howTipsy[index].state = "active";
    };
    $scope.splitIn = "1";

    $scope.increaseSplit = function() {

        if ($scope.splitIn < 25) {
            $scope.splitIn++;
        }
        $scope.calulateTip();
        $(this).hide();
    };
    $scope.decreaseSplit = function() {
        if ($scope.splitIn > 1) {
            $scope.splitIn--;
        }
        $scope.calulateTip();
    };

    $scope.checkDirty = function() {
        if ($('.uneven-splitblk').find('input').hasClass('ng-dirty')) {
            $scope.persons = null;
            /*$scope.persons = [];*/
            $scope.persons.length = $scope.splitIn;
            $scope.equals = $scope.gtotal / $scope.splitIn;


        } else {
            /* $scope.persons = [];
            $scope.persons.length = $scope.splitIn;
            $scope.equals = $scope.gtotal/$scope.splitIn*/
        }
    }
    $scope.calulateTip = function() {

        var style = ""
        if ($scope.amt > 0) {
            style = "bordered-dash ";
            if ($scope.amt >= 10000) {
                style += "error-msg";
                $scope.total = null;
                $scope.textMessage = ["Where you at? Moon??", "Its still 2014 right?", "Paying for food, right?", "Paying for a Martian Fondue?", "Buying the diner??", "Found diamonds in food?", "Chuck Norris waited on you?", "We dont support bitcoins yet!"];
                $scope.showMessage = $scope.textMessage[Math.floor(Math.random() * 8)];
            } else {
                $scope.showMessage = "";
                style += "total-amt";
                $scope.tip = $scope.amt * $scope.tipVal;
                $scope.total = (parseFloat($scope.tip) + parseFloat($scope.amt));
                $scope.gtotal = $scope.total;
                /*$scope.roundit = Math.ceil($scope.gtotal);*/
            };
            $scope.displayborder = style;
        } else {
            $scope.total = null;
            $scope.showMessage = "";
            $scope.displayborder = "";
        }
    };
    $('#aboutMoal').on('hidden.bs.modal', function(e) {});



    $scope.unevenSplit = function() {
        // $scope.persons = [];
        // $scope.persons.length = $scope.splitIn;
        // $scope.equals = $scope.gtotal/$scope.splitIn



        var eachSplit;

        if (!$scope.splitPersons || $scope.splitPersons.length <= 0) {
            $scope.splitPersons = [];
        } else if ($scope.splitPersons.length == 1) {
            $scope.splitPersons = [];
        } else if ($scope.splitPersons.length > $scope.splitIn) {
            $scope.splitPersons.splice(parseFloat($scope.splitPersons.length - 1), 1);
        }


        for (var i = $scope.splitPersons.length; i < $scope.splitIn; i++) {
            eachSplit = {};
            eachSplit.amt = 0;
            eachSplit.edited = false;

            $scope.splitPersons.push(eachSplit);
        }

        $scope.calcSplit();
    }

    $scope.calcSplit = function(getsome) {

        if (getsome)
            getsome.split.edited = true;

        var eTotal = uTotal = eTotalCount = uTotalCount = 0;

        for (var i = 0; i < $scope.splitPersons.length; i++) {
            if ($scope.splitPersons[i].edited) {
                eTotal += parseFloat($scope.splitPersons[i].amt);
                eTotalCount++;
            } else {
                uTotal += parseFloat($scope.splitPersons[i].amt);
                uTotalCount++;
            }

        }

        for (var i = 0; i < $scope.splitPersons.length; i++) {
            if (!$scope.splitPersons[i].edited)
                $scope.splitPersons[i].amt = parseFloat((parseFloat($scope.gtotal) - parseFloat(eTotal)) / uTotalCount).toFixed(2);
        }

    }

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


    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

};