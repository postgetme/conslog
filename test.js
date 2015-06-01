var fs = require('fs');
var path =  require('path');
var strftime = require('strftime');
var moment = require('moment');
var _ = require('lodash');
var s = require("underscore.string");
/*
var logList = [];

fs.readdir("logs_for_test", function(err, files){
    console.log(files);
    
    files.map(function(file){
        fs.stat(path.join("logs_for_test", file), function(err, stat){
            console.log(stat);
            console.log(Math.ceil(stat.size / 1024) + 'k');
            console.log(strftime('%F %H:%M', stat.mtime));
            moment.locale('zh-cn');
            console.log(moment(strftime('%F %H:%M', stat.mtime), "YYYY-MM-DD hh:mm").fromNow());
            
            var date = strftime('%F %H:%M', stat.mtime);
            logList.push({name: file, size: Math.ceil(stat.size / 1024) + 'k', date: date + ' (' + moment(date, "YYYY-MM-DD hh:mm").fromNow() + ')'});
            console.log(logList);
        })    
    });
        
});
*/
/*
var logs = [];
logs.push({name: "R08TRB_130601_1234567891231_201502051420361_FAIL.log", size: "125k", date: "20150205"});
logs.push({name: "R13TRA_130602_1234567891232_201502051420362_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130603_1234567891233_201502051420363_FAIL.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130604_1234567891234_201502051420364_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130605_1234567891235_201502051420365_PASS.log", size: "125k", date: "20150205"});

var key = "fail";
var q = "12345 m12bta 130603 FAIL"
var keys = s.words(q);

var filterLogs = logs;

for(i in keys)
{
    filterLogs = _.filter(filterLogs, function(log) {
        return log.name.match(eval("/" + keys[i] + "/i"));     
    });
}
*/
/*
var filterLogs = _.filter(logs, function(log) {
    return log.name.match(eval("/" + key + "/i"));     
});
*/
/*
console.log(filterLogs);
*/


a = [{name:"ml1", size:"123"}, {name:"ml2", size:"333"}];
b = a.concat();



console.log(a);
console.log(b);

//b[0].name = "ml3";
b[0] = {name:"ml3", size:"555"};

console.log(a);
console.log(b);






