let { List } = require("immutable-ext");
let { fakeAjax, output } = require("./common.js");
let Promise = require('../../libs/promise.js');

function getFileP2(url) {
    return new Promise(function (res, rej) {
        fakeAjax(url, function (response) {
            res(response);
        });
    });
}

Promise.all(
    List.of("file1", "file2", "file3").map(getFileP2)
)
.then(function(results) {
    results.map((item) => output(item));
})
.then(function(){
        output(
            "Complete!"
        )
    });