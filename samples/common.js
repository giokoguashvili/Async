function output() { return Array.from(arguments).map(i => console.log(i)); }

function fakeAjax(url, callback) {
    var fake_responses = {
        "file1": "file1: Text",
        "file2": "file2: Some Text",
        "file3": "file3: Welcome!"
    };
    var randomDealy = Math.floor(Math.random() * 10000 + 1);
    setTimeout(function () {
        callback(fake_responses[url]);
        //console.log("End Request: " + url);
    }, randomDealy);

    //console.log("Request: " + url);
}

module.exports = {
    output,
    fakeAjax
}