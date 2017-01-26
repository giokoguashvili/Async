let { List } = require("immutable-ext");
let { fakeAjax, output } = require("../common.js");
let { Promise, async } = require('../../libs');

function getFileAsync(url) {
    return new Promise(function (res, rej) {
        fakeAjax(url, function (response) {
            res(response);
        });
    });
}

async(function* () {
    let p1 = getFileAsync("file1");
    let p2 = getFileAsync("file2");    
    let p3 = getFileAsync("file3");

    output(
        yield p1,
        yield p2, 
        yield p3,
        "Complete!"
    )
});
