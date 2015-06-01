var express = require('express');
var router = express.Router();
var fs = require('fs');
var path =  require('path');
var strftime = require('strftime');
var moment = require('moment');

var logs = [];
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_FAIL.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_FAIL.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});
logs.push({name: "M12BTA_130600_123456789123_20150205142036_PASS.log", size: "125k", date: "20150205"});

var logList = [];

moment.locale('zh-cn');

/* GET home page. */
router.get('/', function(req, res) {
	fs.readdir("logs_for_test", function(err, files){
	    files.map(function(file){
	        fs.stat(path.join("logs_for_test", file), function(err, stat){
	            var date = strftime('%F %H:%M', stat.mtime);
	            logList.push({name: file, size: Math.ceil(stat.size / 1024) + 'k', date: date + ' (' + moment(date, "YYYY-MM-DD hh:mm").fromNow() + ')'});
	            res.render('index', {logs: logList});
	        });    
	    });
	});
});






module.exports = router;
