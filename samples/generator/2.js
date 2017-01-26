let corutine = require("./common.js");

function getData(d) {
    setTimeout(function () {
        run(d);
    }, 10);
}

var run = corutine(function* () {
    let x = 1 + (yield getData(10));
    let y = 1 + (yield getData(30));

    let result = (yield getData(x + y));
    console.log(result);
});

run();
