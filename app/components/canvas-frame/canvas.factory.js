
/**
 * 渲染相关服务
 */
glpApp.factory('CanvasService', function() {
    // 选中的 Subject 对应的记录
    var currentRecords = [];
    // 当前 Subject 中出现过的 step id 集合
    var nodes = [];

    var updateCurrentRecords = function(newRecords) {
        currentRecords = newRecords;
        // step id 去重
        var stepIds = [];
        angular.forEach(newRecords, function(record) {
            if (stepIds.indexOf(record.step_Id) === -1) {
                stepIds.push(record.step_Id);
            }
            if (stepIds.indexOf(record.next_Step_Id) === -1) {
                stepIds.push(record.next_Step_Id);
            }
        });
        stepIds.sort();
        // save step id list
        nodes.length = 0;
        Array.prototype.push.apply(nodes, stepIds);
    };

    return {
        nodes: nodes,
        updateCurrentRecords: updateCurrentRecords
    };
});
