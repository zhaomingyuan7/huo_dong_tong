function BidResultController($scope, $navigate, $timeout,$http) {

    $scope.go_bid_list = function () {
        $navigate.go('/bid_list')
    }

    $scope.go_count_price = function () {
        $navigate.go('/count_price')
    }

    var bid_messages = JSON.parse(localStorage.getItem('bid_messages')) || [];


    $scope.consult_lists = Bid.current_bid_consult();



    $scope.bid = localStorage.current_bid_name;

    $scope.number = Bid.count_price_show().length;

    function bid_result_footer() {


        $scope.consult_name = Bid.count_price_first_information().name;

        $scope.consult_phone = Bid.count_price_first_information().phone;

        $scope.consult_price = Bid.count_price_first_information().price;

        $scope.bid_result = '竞价结果：';

        $scope.bid_dollar = '￥';

        $scope.bid_success = '竞价成功';
    }

    Bid.result_data();

    if (Bid.count_price_first_information()) {
        $scope.consult_price_modal = Bid.count_price_first_information().price;

        $scope.consult_name_modal = Bid.count_price_first_information().name;

        $scope.consult_phone_modal = Bid.count_price_first_information().phone;

        $timeout(function () {

            $('#ModalSuccess').modal('show');
            $timeout(function () {
                $('#ModalSuccess').modal('hide');
                bid_result_footer();
            }, 3000)
        }, 1)
    }
    if (!Bid.count_price_first_information()) {
        $timeout(function () {
            $('#ModalFalse').modal('show');
            $timeout(function () {
                $('#ModalFalse').modal('hide');
            }, 3000)
        }, 1)
    }

}