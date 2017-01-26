let corutine = require("./common.js");

function* gen() {
    console.log(1);
    let x = yield (2);
    console.log(x);
}


let run = corutine(gen);
let { value: val } = run();
run(val + 3);

// let it = gen();
// let { value: x } = it.next();
// console.log(x);
// it.next(x + 3);