function BiddingListController($scope, $navigate) {

    $scope.go_activity_list = function () {
        $navigate.go('/')
    }

    $scope.start_bidding = function () {
        Bid.storage_bid_list_when_click_start()
        $navigate.go('/bid_sign')
    }

    if (Judge.start_button_can_not_click()) {
        $scope.bidding_list_start = true;
    }

    $scope.go_sign_up = function () {
        $navigate.go('/sign')
    }

    $scope.go_bid_list = function () {
        $navigate.go('/bid_list')
    }

    $scope.activity_go_to_sign_up = function (name) {
        Bid.save_current_bid_name(name);
        $navigate.go('/bid_sign');
    }

    if( Activity.judge_bid_list_start_button()){
        $scope.this_bid_information = true
    }

    $scope.this_bid_information = Bid.save_current_bid_list_page();

    $scope.signing_up_activity = function (name) {
        if (Judge.bidding_background_is_yellow(name)) {
            return "start";
        }
    }
}