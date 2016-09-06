
// init
glpApp.controller('TransferFrameCtrl', ['$scope', '$filter', 'DbService', TransferFrameCtrl]);

function TransferFrameCtrl($scope, $filter, DbService) {
    // 从数据库读入的原始数据变量
    $scope.records = DbService.currentRecords;
}
