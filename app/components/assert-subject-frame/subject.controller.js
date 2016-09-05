
// init
glpApp.controller('SubjectFramesCtrl', SubjectFramesCtrl);

function SubjectFramesCtrl($scope) {
    // 监视从数据库读入的数据变量
    $scope.$watch('transfers', function(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        $scope.names = getSubjectNames($scope.transfers);
    });

    // 选择 subject 时的处理
    $scope.onSelectSubject = function(index) {
        // 激活按钮
        $scope.activeIndex = index;
        // 其他数据处理
        onSelectSubject(index);
    };
}
