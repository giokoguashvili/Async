function fakeAjax(url, callback) {
    var fake_responses = {
        "file1" : "Text",
        "file2" : "Some Text",
        "file3" : "Welcome!"
    };
    var randomDealy = Math.floor(Math.random() * 10000 + 1);
    setTimeout(function() {
        callback(fake_responses[url]);
        console.log("End Request: " + url);
    }, randomDealy);

    console.log("Request: " + url);
}

function getFile(url) {
    var content, fn;

    fakeAjax(url, function(response) {
        if (fn) {
            fn(response);
        }
        else {
            content = response;
        }
    });

    return function(callback) {
        if (content) {
            return callback(content);
        }
        else {
            fn = callback;
        }
    };
}

// Expected behavior:
// - Request all 3 file at the same time (in parallel)
// - log them without waiting for all to finish executing
// - log them in proper order: file1, file2, file3
// - after all 3 are loged, log "Finish"

var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

function output(txt) {
     console.log(new Date().toISOString() + ' : ' + txt);
}

th1(function(text1) {
    output(text1);
    th2(function(text2) {
        output(text2);
        th3(function(text3) {
            output(text3);
        });
    });
});