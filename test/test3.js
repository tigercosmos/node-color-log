const logger = require('../index');

const object = {}
object.x = object
// $ LOGGER=info node test3.js
logger.info("Should print \"[object Object]\" and not throw an error:", object);
