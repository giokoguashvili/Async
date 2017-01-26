let { List } = require("immutable-ext");
let { fakeAjax, output } = require("../common.js");
let Promise = require('../../libs/promise.js');

function getFileP(url) {
    return new Promise(function (res, rej) {
        fakeAjax(url, function (response) {
            res(response);
        });
    });
}

var p1 = getFileP("file1");
var p2 = getFileP("file2");
var p3 = getFileP("file3");

p1
.then(output)
.then(function() {
    return p2;
})
.then(output)
.then(function(){
    return p3;
})
.then(output)
.then(function() {
    output("Complete!");
});