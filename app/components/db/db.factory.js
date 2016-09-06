
/**
 * 数据库管理服务
 */
glpApp.factory('DbService', ['$filter', function($filter) {
    // SQL 返回的记录
    var records = [];
    // 去重后的 AssertSubject 的 id
    var subjectIds = [];
    // 选中的 Subject 对应的记录
    var currentRecords = [];

    // 更新从数据库读入的记录
    var setRecords = function(newRecords) {
        records.length = 0;
        Array.prototype.push.apply(records, newRecords);
        // update other info
        updateSubjectName();
    };

    var selectSubjectById = function(subjectId) {
        var selectedRecords = $filter('filter')(records, function (record) {
            return record.subject_Id == subjectId;
        });
        currentRecords.length = 0;
        Array.prototype.push.apply(currentRecords, selectedRecords);
    };

    var updateSubjectName = function() {
        var subjectIdDict = {};
        records.map(function (a) {
            subjectIdDict[a.subject_Id] = 0;
        });
        subjectIds.length = 0;
        Array.prototype.push.apply(subjectIds, Object.keys(subjectIdDict));
    };

    return {
        records: records,
        subjectIds: subjectIds,
        currentRecords: currentRecords,
        setRecords: setRecords,
        selectSubjectById: selectSubjectById
    };
}]);
