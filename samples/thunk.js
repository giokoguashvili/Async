function output() { return Array.from(arguments).map(i => console.log(i)); }

function sum(a, b) {
    return a + b;
}

function sumAsync(a, b, cb) {
    setTimeout(function() {
        cb(a + b);
    }, 1000);
}

let thunk = function() {
    return sum(10, 7);
}

let thunkAsync = function(cb) {
    return sumAsync(20, 7, cb);
}

output(
    thunk()
);

thunkAsync((sum) => {
    output(sum);  
});

//////////////////////////////

let makeThunk = function(fn) {
    let args = Array.from(arguments).slice(1);
    return function(cb) {
        args.push(cb);
        fn.apply(null, args);
    }
}

let asyncThunk = makeThunk(sumAsync, 14, 23);
asyncThunk((sum) => {
    output(
        sum
    );
})