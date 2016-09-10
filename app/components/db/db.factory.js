
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
    // 选中的 record
    var currentRecord = null;

    /**
     * 更新从数据库读入的记录
     */
    var setRecords = function(newRecords) {
        records.length = 0;
        Array.prototype.push.apply(records, newRecords);
        // parse cond
        records.forEach(function(record) {
            // 遍历每条记录
            record.condFuncString = record.cond;
            try {
                var json = JSON.parse(record.cond);
                var condFuncs = [];
                json.forEach(function(cond) {
                    condFuncs.push('f_' + cond[0] + '(' + cond[1] + ')');
                });
                record.condFuncString = condFuncs.join(' && ');
            } catch (err) {
                console.log(err);
            }
        });
        // update other info
        updateSubjectIds();
    };

    /**
     * 选择 subject
     * @param subjectId 选中的 Subject 的 id
     */
    var selectSubjectById = function(subjectId) {
        var selectedRecords = $filter('filter')(records, function(record) {
            return record.subject_Id === subjectId;
        });
        currentRecords.length = 0;
        Array.prototype.push.apply(currentRecords, selectedRecords);
        currentRecord = null;
    };

    /**
     * 选择 record
     * @param recordId currentRecords 中选中的 Subject 的 id
     */
    var selectRecordById = function(recordId) {
        currentRecord = currentRecords[recordId];
    };

    var getCurrentRecord = function() {
        return currentRecord;
    };

    // 去重，得到 Subject id 列表
    var updateSubjectIds = function() {
        subjectIds.length = 0;
        records.forEach(function(record) {
            if (subjectIds.indexOf(record.subject_Id) === -1) {
                subjectIds.push(record.subject_Id);
            }
        });
    };

    return {
        records: records,
        subjectIds: subjectIds,
        currentRecords: currentRecords,
        currentRecord: getCurrentRecord,
        setRecords: setRecords,
        selectSubjectById: selectSubjectById,
        selectRecordById: selectRecordById
    };
}]);
