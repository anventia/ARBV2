const math = require('mathjs');

function matheval(input) {
    return math.evaluate(input);
}

module.exports = { matheval };