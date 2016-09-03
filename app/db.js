var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./temp/default.sqlite', function() {
    db.all("select * from TRANSFER",function(err, res){
        if(!err) {
            updateSubjectNames(res);
        } else {
            console.log(err);
        }
    });

});

function updateSubjectNames(transfers) {
    console.log(transfers[0]['subject_Id']);
}
