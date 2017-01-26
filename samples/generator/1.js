function* gen() {
    console.log(1);
    let x = yield (2);
    console.log(x);
}

let it = gen();
let { value: x } = it.next();
console.log(x);
it.next(x + 3);