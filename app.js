var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var fs = require('fs');
var strftime = require('strftime');
var moment = require('moment');
var _ = require('lodash');
var s = require("underscore.string");
var Q   = require("q");
var iconv = require('iconv-lite');

moment.locale('zh-cn');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.raw({ type: 'text/plain', limit: 1024 * 1024 * 10 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress());

var logList = [];
app.locals.size = 0;

fs.readdirSync("logs_for_test").map(function(file){
    var stats = fs.statSync(path.join("logs_for_test", file));
    var fail  = file.indexOf("FAIL") > -1 ? true : false;
    logList.push({name: file, size: Math.ceil(stats.size / 1024) + 'k', date: strftime('%F %H:%M', stats.mtime), fail: fail});

    app.locals.size += stats.size;
});

app.locals.sum = logList.length;

logList.sort(function(a, b){
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});

var logListN = logList.slice(0, 30);
delete logList;

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/refresh', function(req, res) {
    var logListMoment = logListN.concat();
    logListMoment.map(function(log, i) {
        logListMoment[i] = {name: log.name, 
                            size: log.size, 
                            date: log.date + ' (' + 
                                  moment(log.date, "YYYY-MM-DD hh:mm").fromNow() + ')',
                            fail: log.fail};
    });

    var json = {};
    json.logs = logListMoment;
    var m = app.locals.size / 1024 / 1024;
    json.sum = app.locals.sum + ' / ' + m.toFixed(2) + 'M';
    res.json(json);
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/search', function(req, res, next) {
  var keys = _.uniq(s.words(req.query.q));
  var logs = fs.readdirSync("logs_for_test");
  var filterLogs = logs;
  var results = [];

  //不合法的搜索，跳转到首页
  if(!req.query.q || req.query.q.indexOf('*') >= 0) res.redirect('/');
  
  for(i in keys)
  {
    filterLogs = _.filter(filterLogs, function(log) {
      return log.match(eval("/" + keys[i] + "/i"));     
    });
  }

  filterLogs.map(function(file) {
    var stats = fs.statSync(path.join("logs_for_test", file));
    results.push({name: file, size: Math.ceil(stats.size / 1024) + 'k', date: strftime('%F %H:%M', stats.mtime)});
  });  

  results.sort(function(a, b){
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

    var logListMoment = results.concat();
    logListMoment.map(function(log, i) {
        logListMoment[i] = {name: log.name, 
                            size: log.size, 
                            date: log.date + ' (' + 
                                  moment(log.date, "YYYY-MM-DD hh:mm").fromNow() + ')'};
    });  

  res.render('search', {q: keys.toString().replace(/,/g, ' '), logs: logListMoment});
});

app.get('/:name', function(req, res, next) {
  var logName = req.params.name;  
  if(logName.indexOf('log') < 0) next();

  fs.readFile('logs_for_test/' + logName, function(err, data){
    if(err) {
        res.render('log', {name: logName, content: "文件读取失败"});
    } else {
        //res.render('log', {name: logName, content: data});
        res.render('log', {name: logName, content: iconv.decode(data, 'gb2312')});
    }
  });

});

var Log = function(baseLogDir, name){

    /// get the base log dir
    //baseLogDir = getLogDirectory(baseLogDir);

    /// get the log filename
    //name = getLogFilename(baseLogDir, name);

    name = baseLogDir + '/' + name;

    var self = {

        /**
         *
         * Write the buffer into the log file
         *
         * @param  {Buffer} buffer
         * @return {Promise}
         *
         */
        write: function(buffer){

            var dfd = Q.defer();

            fs.appendFile(name, buffer, function(err){
                if(err) dfd.reject(err);
                else    dfd.resolve();
            });


            return dfd.promise;

        }

    };

    return self;

};

app.post('/:id/log/', function(req, res) {
    var logName = req.params.id;

    if(fs.existsSync(path.join("logs_for_test", logName))) {
        res.send();
    } else {
        Log('logs_for_test', logName)
        .write(req.body)
        .then(function(){        
            res.send();
            //更新logListN
            var stats = fs.statSync(path.join("logs_for_test", logName));
            if(logListN.length >= 30) logListN.pop();
            var fail  = logName.indexOf("FAIL") > -1 ? true : false;
            logListN.unshift({name: logName, size: Math.ceil(stats.size / 1024) + 'k', date: strftime('%F %H:%M', stats.mtime), fail: fail});
            //更新日志数量和占用空间
            app.locals.sum++;
            app.locals.size += stats.size;
        });        
    }


});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
