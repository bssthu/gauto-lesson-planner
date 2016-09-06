
// 获取去重后的 AssertSubject
glpApp.factory('DbService', function() {
    var records = [];
    var subjectNames = [];

    var update = function(newRecords) {
        records.length = 0;
        Array.prototype.push.apply(records, newRecords);
        // update other info
        updateSubjectName();
    };

    var updateSubjectName = function() {
        var subjectIds = {};
        records.map(function (a) {
            subjectIds[a.subject_Id] = 0;
        });
        subjectNames.length = 0;
        Array.prototype.push.apply(subjectNames, Object.keys(subjectIds));
    };

    return {
        records: records,
        subjectNames: subjectNames,
        update: update
    };
});
