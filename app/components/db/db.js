var sqlite3 = require('sqlite3').verbose();

// load default db
loadDb('./temp/default.sqlite');

// 从文件中载入数据库
function loadDb(dbPath) {
    var db = new sqlite3.Database(dbPath, function() {
        db.all("select * from TRANSFER",function(err, res){
            if(!err) {
                updateSubjectNames(res);
            } else {
                console.log(err);
            }
        });

    });
}

// 更新 assert-subject 名字列表
function updateSubjectNames(records) {
    var appElement = document.querySelector('[ng-controller=SubjectFrameCtrl]');
    var $scope = angular.element(appElement).scope();

    // 更新到 Angular
    $scope.$apply(function() {
        $scope.records = records;
    });
}
