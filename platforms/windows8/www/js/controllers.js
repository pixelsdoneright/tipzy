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
        $("#amtInput").focus();
    };
    $scope.splitIn = "1";

    $scope.increaseSplit = function () {

        if ($scope.splitIn < 25) {
            $scope.splitIn++;
        }
        $scope.calulateTip();
        $(this).hide();
        $("#amtInput").focus();
    };
    $scope.decreaseSplit = function () {
        if ($scope.splitIn > 1) {
            $scope.splitIn--;
        }
        $scope.calulateTip();
        $("#amtInput").focus();
    };
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
                    $scope.total = (parseFloat($scope.tip) + parseFloat($scope.amt)) / parseFloat($scope.splitIn);
                };            
            $scope.displayborder = style;
        }else{
            $scope.total = null;
            $scope.showMessage = "";
            $scope.displayborder="";
        }
    };
    $('#aboutMoal').on('hidden.bs.modal', function (e) {
        $("#amtInput").focus();
    });
};