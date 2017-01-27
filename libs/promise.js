class Promise {
    constructor(fn) {
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
        fn(res, rej);
    }

    then(cb) {
        let prevThis = this;
        this._cb = function (val) {
            this._nextPr.res(cb(val));
        }
        let nextPr = new Promise(function (res, rej) {
            prevThis._nextPr = { res, rej }
        });
        if (this._val) this._cb(this._val);
        return nextPr;
    }

    concat(promise) {
        return this.then(function () {
            return promise;
        });
    }
    
    static resolve() {
        return new Promise(function (res, rej) { res("resolved"); });
    }

    static all(promises) {
        return new Promise(function (res) {
            let results = [];
            promises
                .reduce(function (chain, pr) {
                    return chain
                        .concat(pr)
                        .then(function (val) {
                            results.push(val);
                        })
                }, Promise.resolve())
                .then(function () {
                    res(results);
                });
        });
    }
}

module.exports = Promise;