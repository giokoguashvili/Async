let { List } = require("immutable-ext");
let { fakeAjax, output } = require("./common.js");
let Promise = require('../../libs/promise.js');

function getFileP(url) {
    return new Promise(function (res, rej) {
        fakeAjax(url, function (response) {
            res(response);
        });
    });
}

["file1", "file2", "file3"]
    .map(getFileP)
    .reduce(function (chain, promise) {
        return chain
            .concat(promise)
            .then(output);
    }, Promise.resolve())
    .then(function() {
        output(
            "Complete!"
        )
    });
