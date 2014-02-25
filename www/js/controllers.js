var cTip = function ($scope) {
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
    $scope.setActive = function (index) {
        for (i = 0; i < $scope.howTipsy.length; i++) {
            $scope.howTipsy[i].state = "";
        }
        $scope.howTipsy[index].state = "active";
    };
    $scope.splitIn = "1";

    $scope.increaseSplit = function () {

        if ($scope.splitIn < 25) {
            $scope.splitIn++;
        }
        $scope.calulateTip();
        $(this).hide();
    };
    $scope.decreaseSplit = function () {
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
            $scope.equals = $scope.gtotal/$scope.splitIn;
            

        } else {
           /* $scope.persons = [];
            $scope.persons.length = $scope.splitIn;
            $scope.equals = $scope.gtotal/$scope.splitIn*/
        }
    }
    $scope.calulateTip = function () {
        
        var style = ""
        if($scope.amt > 0 ){
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
        }else{
            $scope.total = null;
            $scope.showMessage = "";
            $scope.displayborder="";
        }
    };
    $('#aboutMoal').on('hidden.bs.modal', function (e) {
    });

    

    $scope.unevenSplit = function() {
        // $scope.persons = [];
        // $scope.persons.length = $scope.splitIn;
        // $scope.equals = $scope.gtotal/$scope.splitIn


        

        var eachSplit;

        if(!$scope.splitPersons || $scope.splitPersons.length <= 0){
            $scope.splitPersons = [];
        }else if($scope.splitPersons.length == 1){
            $scope.splitPersons = [];
        }else if($scope.splitPersons.length > $scope.splitIn){
            $scope.splitPersons.splice(parseFloat($scope.splitPersons.length-1), 1);
        }
        

        for(var i=$scope.splitPersons.length; i < $scope.splitIn; i++){
                eachSplit = {};
                eachSplit.amt = 0;
                eachSplit.edited = false;

                $scope.splitPersons.push(eachSplit);
            }
        
        $scope.calcSplit();
    }

    $scope.calcSplit = function(getsome) {

        if(getsome)
            getsome.split.edited = true;

        var eTotal = uTotal = eTotalCount = uTotalCount = 0;

        for(var i=0; i < $scope.splitPersons.length; i++){
            if($scope.splitPersons[i].edited){
                eTotal += parseFloat($scope.splitPersons[i].amt);
                eTotalCount++;                
            }else{
                uTotal += parseFloat($scope.splitPersons[i].amt);
                uTotalCount++;
            }
                
        }

        for(var i=0; i < $scope.splitPersons.length; i++){
            if(!$scope.splitPersons[i].edited)
                $scope.splitPersons[i].amt = parseFloat((parseFloat($scope.gtotal) - parseFloat(eTotal)) / uTotalCount).toFixed(2);
        }



        // var minitotal = 0;
       
        // var getClass = getsome.$index;

        // var splitbet = parseFloat($('.divide-input').length) - parseFloat($('.uneven-splitblk').find('.ng-dirty').length);
        // var splitnot = parseFloat($('.uneven-splitblk').find('.ng-dirty').length);

        // var minustotal = 0;

        // var dirtyArray = new Array();
        // $('.uneven-splitblk').find('.ng-dirty').each(function() {
        //    dirtyArray.push($(this).val());
        // });

        // console.log(dirtyArray);

        // var minustotal=0;
        // for (var i=dirtyArray.length; i--;) {
        //     minustotal+=parseFloat(dirtyArray[i]);
        // }


        // minitotal = parseFloat($scope.gtotal) - parseFloat(minustotal);

        // $scope.newequals = (parseFloat(minitotal))/parseFloat(splitbet);
        // $scope.equals = $scope.newequals;
        
    }
 
};