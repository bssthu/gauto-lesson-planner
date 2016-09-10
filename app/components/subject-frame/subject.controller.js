
// init
glpApp.controller('SubjectFrameCtrl', ['$scope', 'DbService', SubjectFrameCtrl]);

function SubjectFrameCtrl($scope, DbService) {
    // 去重后的 Subject id
    $scope.subjectIds = DbService.subjectIds;

    // 选择 subject 时的处理
    $scope.onSelectSubject = function(index) {
        // 激活按钮
        $scope.activeIndex = index;
        // 其他数据
        var selectedSubjectId = $scope.subjectIds[index];
        DbService.selectSubjectById(selectedSubjectId);
    };
}
