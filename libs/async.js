let Promise = require("./promise.js");
let corutine = require("./corutine.js");

function async(gen) {
    return new Promise(function (res) {
        let co = corutine(gen);

        let onThen = function (prevPromiseResult) {
            let { value, done } = co(prevPromiseResult);
            if (!done) {
                value.then(onThen);
            }
            else {
                res(value);
            }
        }

        onThen();
    });
}

module.exports = async;
