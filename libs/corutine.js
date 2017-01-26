function corutine(g) {
    let it = g();
    return function () {
        return it.next.apply(it, arguments);
    }
}

module.exports = corutine;