refresh();

setInterval(function() {
    refresh();
}, 1000);

var logList = new Vue({
    el: '#logList',
    data: {
        logs: []
    }
});

var sum = new Vue({
    el: '#sum',
    data: {
        sum: 0
    }
});

function refresh() {
    $.getJSON("/refresh", function(data) {
        logList.logs = data.logs;
        sum.sum = data.sum;
    });
}
