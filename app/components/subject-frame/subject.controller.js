
// init
glpApp.controller('SubjectFrameCtrl', ['$scope', 'DbService', SubjectFrameCtrl]);

function SubjectFrameCtrl($scope, DbService) {
    // 监视从数据库读入的数据变量
    $scope.names = DbService.subjectNames;

    // 选择 subject 时的处理
    $scope.onSelectSubject = function(index) {
        // 激活按钮
        $scope.activeIndex = index;
        // 其他数据处理
        onSelectSubject(index);
    };
}
