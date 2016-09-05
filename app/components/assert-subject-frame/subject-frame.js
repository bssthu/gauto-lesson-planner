
// init
var leftApp = angular.module('leftApp', []);
leftApp.controller('SubjectFramesCtrl', SubjectFramesCtrl);

// load default db
loadDb('./temp/default.sqlite');

function SubjectFramesCtrl($scope) {
    $scope.$watch('transfers', function(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        $scope.names = getSubjectNames($scope.transfers);
    });
}

// 获取去重后的 AssertSubject
function getSubjectNames(transfers) {
    var subjectIds = {};
    transfers.map(function(a) {subjectIds[a.subject_Id] = 0;});
    return Object.keys(subjectIds);
}
