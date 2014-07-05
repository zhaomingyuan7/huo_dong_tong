function BiddingSignController($scope, $navigate) {

    $scope.go_bid_list = function () {
        $navigate.go('/bid_list');
    }

    if(Judge.button_is_end()){
        $scope.start_end = 'end';
    }
    else{
        if(Judge.bid_list_end_condition()){
            $scope.start_end = 'end';
        }
        if(Judge.button_is_start()){
            $scope.start_end = 'start';
        }
        if(Judge.button_is_disabled()){
            $scope.start_end = 'disabled';
        }
    }

    if(Judge.bid_list_end_condition_two()){
        $scope.start_end = 'end'
    }


    $scope.start_bidding = function (){
        Bid.save_bid_sign_status('start');
        $scope.start_end = 'end';
        Bid.save_current_bidding_name(Bid.save_bidding_name().name);
    }


    $scope.end_bidding = function () {
        end_confirm();
        }


    $scope.ss = true;


    function end_confirm()
    {
        var r = confirm("确认退出")
        if (!r) {
            $scope.start_end = "end";
        }
        if(r) {
            $scope.start_end = "end";
            Bid.save_bid_sign_status('end');
            localStorage.setItem('current_bidding', '');
            $navigate.go('/bid_result');
        }
    }


    $scope.bid = localStorage.current_bid_name;


    $scope.refresh_bid_messages = function (){
        $scope.current_bid_messages = Bid.creat_current_bid_message();
        $scope.number = Bid.count_bid_sign_number();
    }

    $scope.refresh_bid_messages();

}