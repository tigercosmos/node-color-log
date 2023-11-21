const fs = require('fs');

const logger = require('../index');

fileStream = fs.createWriteStream('stream_log.test.log'),

logger.setLogStream(fileStream)

logger.log("hello");
logger.log("hello", "world");
logger.debug("hello", "world");
logger.success("hello", "world");
logger.info("hello", "world");
logger.warn("hello", "world");
logger.error("hello", "world");

fileStream.close()
