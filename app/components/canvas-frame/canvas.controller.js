
// init
glpApp.controller('CanvasFrameCtrl', ['$scope', 'CanvasService', 'DbService', CanvasFrameCtrl]);

function CanvasFrameCtrl($scope, CanvasService, DbService) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    $scope.currentRecords = DbService.currentRecords;
    $scope.nodes = CanvasService.nodes;

    $scope.$watch('currentRecords', function(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        CanvasService.updateCurrentRecords($scope.currentRecords);
        draw();
    }, true);

    /**
     * 绘图函数
     */
    function draw() {
        console.log($scope.nodes);
    }

    draw();
}
