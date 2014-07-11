function BiddingSignController($scope, $navigate,$http) {

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
        $http.post('/deal_with_upload_data', {
            "user_name":localStorage.current_user,
            "messages":Sms.get_messages(),
            "bid_messages":Sms.get_bid_messages(),
            "bid_lists":Bid.bid_lists(),
            "activities":Activity.get_activity()
        })
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
            $http.post('/deal_with_upload_data', {
                "user_name":localStorage.current_user,
                "messages":Sms.get_messages(),
                "bid_messages":Sms.get_bid_messages(),
                "bid_lists":Bid.bid_lists(),
                "activities":Activity.get_activity()
            })
            if(Bid.count_price_first_information()){
                $.ajax({type: "POST",
                    url: "/end_bidding",
                    data: { "winner":"winner",
                        "name":Bid.count_price_first_information().name,
                        "phone":Bid.count_price_first_information().phone,
                        "price":Bid.count_price_first_information().price
                    }
                })
            }else{
                $.ajax({type: "POST",
                    url: "/end_bidding",
                    data: {"no_winner":"no_winner"}})
            }
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