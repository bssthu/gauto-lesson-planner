
// init
glpApp.controller('TransferFrameCtrl', ['$scope', '$filter', 'DbService', TransferFrameCtrl]);

function TransferFrameCtrl($scope, $filter, DbService) {
    // 从数据库读入的原始数据变量
    $scope.records = DbService.currentRecords;

    // 选择 transfer 时的处理
    $scope.onSelectTransfer = function(index) {
        // 激活按钮
        $scope.activeIndex = index;
    };
}
