function fakeAjax(url, callback) {
    var fake_responses = {
        "file1" : "Text",
        "file2" : "Some Text",
        "file3" : "Welcome!"
    };

    var randomDealy = Math.floor(Math.random() * 1000 + 1);
    setTimeout(function() {
        callback(fake_responses[url])
    }, randomDealy);
}