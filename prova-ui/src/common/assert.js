const Logger = require('./loggers')
const {assert} = require('chai')

module.exports = (actual, expected, message) => {
    Logger.info(message)    
    assert.equal(actual, expected, message);
}