class Promise {

    constructor(asyncFn) {
        this._val = null;
        this._cb = null;

        let fillState = (function (val) {
            this._val = val;
            if (this._cb) this._cb(this._val);
        }).bind(this);

        let res = (function (val) {
            if (typeof val === 'object' && val.constructor.name === 'Promise') {
                val.then(fillState);
            } else {
                fillState(val);
            }
        }).bind(this);

        let rej = (function () { }).bind(this);
        asyncFn(res, rej);
    }

    then(cb) {
        let prevThis = this;
        this._cb = function (val) {
            this._nextP.res(cb(val));
        }
        let nextP = new Promise(function (res, rej) {
            prevThis._nextP = { res, rej }
        });
        if (this._val) this._cb(this._val);
        return nextP;
    }
}

let p2 = new Promise(function (res, rej) {
    setTimeout(function () {
        res("Welcome - P2");
    }, 100);
});

let p3 = new Promise(function (res, rej) {
    setTimeout(function () {
        res("Welcome - P3");
    }, 100);
})

let p1 = new Promise(function (res, rej) {
    setTimeout(function () {
        res("Welcome - P1");
    }, 0);
})
    .then(function (val) {
        let t = "(then 1 - " + val + ")";
        console.log(t);
        return t;
    })
    .then(function (val) {
        let t = "(then 2 - " + val + ")";
        console.log(t);
        return t;
    })
    .then(function (val) {
        return p2
            .then(function (val1) {
                return val1 + " " + val;
            })
            .then(function (v) {
                return p3
            });
    })
    .then(function (val) {
        let t = "(then 1 - " + val + ")";
        console.log(t);
        return t;
    });