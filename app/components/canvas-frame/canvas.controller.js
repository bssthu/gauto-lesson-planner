
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
        draw(context, $scope.nodes);
    }, true);

    draw(context, $scope.nodes);

    /**
     * 绘图函数
     * @param context
     * @param nodes 出现过的 step id，升序排列
     */
    function draw(context, nodes) {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        for (var i = 0; i < nodes.length; i++) {
            drawStep(context, i, nodes.length, nodes[i]);
        }
    }

    /**
     *
     * @param context
     * @param id 图形从上到下的编号
     * @param idNum id 个数
     * @param stepId step 的编号
     */
    function drawStep(context, id, idNum, stepId) {
        var windowWidth = context.canvas.width;
        var windowHeight = context.canvas.height;
        var cx = windowWidth / 2;
        var cy = windowHeight / (idNum + 1) * (id + 1);
        // custom
        var width = windowWidth / 5;
        var height = windowHeight / idNum / 2;
        // rect
        context.rect(cx - width / 2, cy - height / 2, width, height);
        context.stroke();
        // text
        var fontArgs = context.font.split(' ');
        context.textAlign = 'center';
        context.font = '20px ' + fontArgs[fontArgs.length - 1];
        console.log(context.font);
        context.fillText('step_' + stepId, cx, cy);
    }
}
