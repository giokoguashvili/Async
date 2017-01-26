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

List.of("file1", "file2", "file3")
    .foldMap(getFileP2, Promise.resolve())
    .then(function(){
        output(
            "Complete!"
        )
    });
