import Logger from './loggers.js'
import {assert} from 'chai'

export default (actual, expected, message) => {
    Logger.info(message)    
    assert.equal(actual, expected, message);
}