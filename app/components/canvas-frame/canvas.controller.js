
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
        draw(context, $scope.currentRecords, $scope.nodes);
    }, true);

    draw(context, $scope.currentRecords, $scope.nodes);

    /**
     * 绘图函数
     * @param context
     * @param records 记录
     * @param nodes 出现过的 step id，升序排列
     */
    function draw(context, records, nodes) {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        for (var i = 0; i < nodes.length; i++) {
            drawStep(context, nodes.length, i, nodes[i]);
        }
        angular.forEach(records, function(record) {
            var stepId = record.step_Id;
            var nextStepId = record.next_Step_Id;
            drawTransferCurve(context, nodes.length, nodes.indexOf(stepId), nodes.indexOf(nextStepId));
        });
    }

    /**
     * 绘制 step 方框
     * @param context
     * @param idNum id 个数
     * @param id 图形从上到下的编号
     * @param stepId step 的编号
     */
    function drawStep(context, idNum, id, stepId) {
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
        context.textBaseline = 'middle';
        context.font = '20px ' + fontArgs[fontArgs.length - 1];
        context.fillText('step_' + stepId, cx, cy);
    }

    /**
     * 绘制 step 转移曲线
     * @param context
     * @param idNum
     * @param stepIdR step 在图中所有 step 列表里的位置，例如 step_100 在 [step_0, step_100, step_200] 中的 IdR 为 1
     * @param nextStepIdR
     */
    function drawTransferCurve(context, idNum, stepIdR, nextStepIdR) {
        if (stepIdR < 0 || nextStepIdR < 0) {
            return;
        }
        var windowWidth = context.canvas.width;
        var windowHeight = context.canvas.height;
        var cx = windowWidth / 2;
        var cy1 = windowHeight / (idNum + 1) * (stepIdR + 1);
        var cy2 = windowHeight / (idNum + 1) * (nextStepIdR + 1);
        // custom
        var width = windowWidth / 5;
        // id 增加在右，减少在左
        var factor = 1;
        if (stepIdR > nextStepIdR) {
            factor = -1;
        }
        var deltaId = (nextStepIdR - stepIdR) * factor;
        // curve
        context.beginPath();
        context.moveTo(cx + width / 2 * factor, cy1);
        context.bezierCurveTo(
            cx + width / 2 * factor + (windowWidth - width) * factor * deltaId / (idNum - 1) / 2, cy1,
            cx + width / 2 * factor + (windowWidth - width) * factor * deltaId / (idNum - 1) / 2, cy2,
            cx + width / 2 * factor, cy2
        );
        context.stroke();
    }
}
