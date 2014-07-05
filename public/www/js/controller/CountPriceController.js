function CountPriceController($scope, $navigate) {

    $scope.price_go_bid_list = function () {
        $navigate.go('/bid_list')
    }

    $scope.price_go_bid_result = function () {
        $navigate.go('/bid_result')
    }


    function bid_result_footer() {

        $scope.consult_name = Bid.count_price_first_information().name;

        $scope.consult_phone = Bid.count_price_first_information().phone;

        $scope.consult_price = Bid.count_price_first_information().price;

        $scope.bid_result = '竞价结果：';

        $scope.bid_dollar = '￥';

        $scope.bid_success = '竞价成功';

        $scope.price_lists = Bid.price_and_num();

        $scope.bid = localStorage.current_bid_name;

        $scope.number = Bid.count_price_show().length;
    }


    if(Bid.count_price_first_information()){
        bid_result_footer();
    }
}