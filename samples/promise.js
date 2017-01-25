// class Promise {
//     constructor(fn) {
//         this._fn = fn;
//         this._cb = null;
//         this._val = null;

//         this.res = this.res.bind(this);
//         this._fn(this.res, this.rej);
//     }

//     res(val) {
//         if (this._cb) {
//             this._cb(val);
//         } else {
//             this._val = val;
//         }
//     }

//     rej() {

//     }

//     then(cb) {
//         let cbRes = null;

//         if (this._val !== null) {
//             cbRes = cb(val);


//         } else {

//             let nextFn = function(prevProm) {
//                 if (this._cb) {
//                     this._cb = function() {

//                     }
//                     prevProm.then(function() {

//                     })
//                 }
//             }

//             let pFun = (function (res, rej) {
//                 this._cb = function (val) {
//                     let cbRes1 = cb(val);
//                     if (cbRes1.constructor !== 'Promise') {
//                         res(cbRes1);
//                     } else {
//                         nextFn(cbRes1);
//                     }

//                 }
//             }).bind(this);
//             return new Promise(pFun);
//         }
//     }
// }

// let p1 = new Promise(function (res, rej) {
//     setTimeout(function () {
//         res("Welcome!");
//     }, 1000);
// })
// .then(function (val) {
//     console.log(val);
//     return "next val";
// })
// .then(function (val) {
//     console.log(val);
// });

////////////////////////////////

class Promise {

    constructor(asyncFn) {
        this._val = null;
        this._cb = null;

        let fillState = (function (val) {
            this._val = val;
            if (this._cb) this._nextP.res(this._cb(this._val));
        }).bind(this);

        let res = (function (val) {
            if (typeof val === 'object') {
                val.then(fillState);
            } else {
                fillState(val);
            }
        }).bind(this);

        let rej = (function () { }).bind(this);

        asyncFn(res, rej);
    }

    _wrapCb(cb) {
        return cb();
    }

    then(cb) {
        let prevThis = this;
        this._cb = cb;

        return new Promise(function (res, rej) {
            prevThis._nextP = { res, rej }
            if (prevThis._val) {
                res(prevThis._cb(prevThis._val));
            }

        });
    }
}

let p2 = new Promise(function (res, rej) {
    setTimeout(function () {
        res("Welcome! - P2");
    }, 1000);
})

let p1 = new Promise(function (res, rej) {
    setTimeout(function () {
        res("Welcome!");
    }, 1000);
})
    .then(function (val) {
        console.log(val);
        return "next val";
    })
    .then(function (val) {
        console.log(val);

        return p2.then(function (val) {
            //console.log(val);
            return val + 'kogoia';
        })
            .then(function (val) {
                console.log(val);
                console.log('1');
            });
    })
    .then(function (val) {
        console.log(val);
        console.log('2');
        return 2;
    });


// new Promise(function (res, rej) {
//     res(100)
// })
// .then(function (val) { // 100
//     return val * 2;
// })
// .then(function (val) {
//     return new Promise(function (res, rej) {
//         res(val);
//     })
//     .then(function (val) {
//         return val * 3;
//     })
//     .then(function(val) {
//         _nextP.res(val);
//     });
// })

// new Promise(function (res, rej) {
//     prevThis._nextP = { res, rej }
// })
// .then(function (val) {
//     console.log(val);
// })
