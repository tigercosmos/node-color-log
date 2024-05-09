const fs = require('fs');
const logger = require('../../index');
const { createLevelLogMessage } = require('./utils/levelLogUtils')

const FILE_NAME = 'stream_log.test.log'

describe('Write File', () => {
    test('write log to file', (done) => {
        const fileStream = fs.createWriteStream(FILE_NAME);
        logger.setLogStream(fileStream);
        const fixedDate = new Date();
        logger.setDate(() => fixedDate.toISOString());

        logger.log("hello");
        logger.log("hello", "world");
        logger.debug("hello", "world");
        logger.success("hello", "world");
        logger.info("hello", "world");
        logger.warn("hello", "world");
        logger.error("hello", "world");

        fileStream.close(() => {
            const fileContent = fs.readFileSync('stream_log.test.log', 'utf8');
            const expectedFileContent = 
                'hello\x1B[0m\n' +
                'hello world\x1B[0m\n' +
                `${fixedDate.toISOString()} ${createLevelLogMessage('debug', 'hello world')}\n` +
                `${fixedDate.toISOString()} ${createLevelLogMessage('success', 'hello world')}\n` +
                `${fixedDate.toISOString()} ${createLevelLogMessage('info', 'hello world')}\n` +
                `${fixedDate.toISOString()} ${createLevelLogMessage('warn', 'hello world')}\n` +
                `${fixedDate.toISOString()} ${createLevelLogMessage('error', 'hello world')}\n`;
            
            expect(fileContent).toBe(expectedFileContent);

            fs.unlinkSync(FILE_NAME);
            logger.setDate(() => (new Date()).toISOString());
            logger._customizedConsole = console
            done();
        });
    })
})
