// Use promises
let { List } = require("immutable-ext");

let Promise = require('../libs/promise.js');

function output() { return Array.from(arguments).map(i => console.log(i)); }

function fakeAjax(url, callback) {
    var fake_responses = {
        "file1": "Text",
        "file2": "Some Text",
        "file3": "Welcome!"
    };
    var randomDealy = Math.floor(Math.random() * 10000 + 1);
    setTimeout(function () {
        callback(fake_responses[url]);
        //console.log("End Request: " + url);
    }, randomDealy);

    //console.log("Request: " + url);
}

function getFileP(url) {
    return new Promise(function (res, rej) {
        fakeAjax(url, function (response) {
            res(response);
        });
    });
}

function getFileP2(url) {
    return new Promise(function (res, rej) {
        fakeAjax(url, function (response) {
            res(response);
        });
    }).then(output);
}

////////////// example 1 

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

/// Example - 2

["file1", "file2", "file3"]
    .map(getFileP)
    .reduce(function (chain, promise) {
        return chain.concat(promise)
            .then(output);
    }, Promise.resolve());

// Example - 3

List.of("file1", "file2", "file3")
    .foldMap(getFileP2, Promise.resolve())
    .then(function(){
        output(
            "Complete!"
        )
    });
