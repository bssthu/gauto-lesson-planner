
// init
glpApp.controller('SubjectFrameCtrl', SubjectFrameCtrl);

function SubjectFrameCtrl($scope) {
    // 监视从数据库读入的数据变量
    $scope.$watch('records', function(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        $scope.names = getSubjectNames($scope.records);
    });

    // 选择 subject 时的处理
    $scope.onSelectSubject = function(index) {
        // 激活按钮
        $scope.activeIndex = index;
        // 其他数据处理
        onSelectSubject(index);
    };
}
