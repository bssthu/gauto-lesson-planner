
// 获取去重后的 AssertSubject
function getSubjectNames(transfers) {
    var subjectIds = {};
    transfers.map(function(a) {subjectIds[a.subject_Id] = 0;});
    return Object.keys(subjectIds);
}

// 选中 Subject 后的处理
function onSelectSubject(index) {
    console.log(index);
}
