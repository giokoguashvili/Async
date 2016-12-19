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

var MyPromise = (function() {
    var _this = this;
    var _state, fn;

    var _promise = {
        then: _then
    };

    function _resolve(response) {
        if (fn) {
            fn(response);
        } else {
            _state = response;
        }
    }

    function _then(callback) {
        if (this._state) {
            callback(_state);
        } else {
            fn = callback;
        }
        return _promise;
    }

    return function (asyncFunc) {
        asyncFunc(_resolve)
        return _promise;  
    }
})();

new MyPromise(function(resolve) {
    fakeAjax("file1", function(response) {
        resolve(response);
    });
})
.then(function(response) {
    console.log(response);
});