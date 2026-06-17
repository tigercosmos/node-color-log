const { PassThrough, Writable } = require('stream');
const logger = require('../../index');

// Redirect actual log output to a stand-alone no-op console so that
// jest.spyOn(console, 'error') only observes warnings emitted by the
// library itself, not the formatted log lines.
logger._customizedConsole = { log: () => {}, error: () => {} };

afterEach(() => {
    jest.restoreAllMocks();
});

describe('colorLog() partial ticket object', () => {
    test('only `font` provided does not warn about missing background', () => {
        const spy = jest.spyOn(console, 'error');

        logger.colorLog({ font: 'red' }, 'Only font.');

        expect(spy).not.toHaveBeenCalled();
        expect(logger.lastCommand).toBe('\x1b[31mOnly font.\x1b[0m');
    });

    test('only `bg` provided does not warn about missing font', () => {
        const spy = jest.spyOn(console, 'error');

        logger.colorLog({ bg: 'green' }, 'Only bg.');

        expect(spy).not.toHaveBeenCalled();
        expect(logger.lastCommand).toBe('\x1b[42mOnly bg.\x1b[0m');
    });

    test('empty ticket object does not warn', () => {
        const spy = jest.spyOn(console, 'error');

        logger.colorLog({}, 'No color.');

        expect(spy).not.toHaveBeenCalled();
        expect(logger.lastCommand).toBe('No color.\x1b[0m');
    });

    test('invalid `font` still warns even when `bg` is omitted', () => {
        const spy = jest.spyOn(console, 'error');

        logger.colorLog({ font: 'nope' }, 'Bad font.');

        expect(spy).toHaveBeenCalledWith(
            'node-color-log warning: Font color not found! Use the default.'
        );
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test('invalid `bg` still warns even when `font` is omitted', () => {
        const spy = jest.spyOn(console, 'error');

        logger.colorLog({ bg: 'nope' }, 'Bad bg.');

        expect(spy).toHaveBeenCalledWith(
            'node-color-log warning: Background color not found! Use the default.'
        );
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe('setLevel() error handling', () => {
    test('throws an Error (not a string) on invalid level', () => {
        expect(() => logger.setLevel('not-a-level')).toThrow(Error);
        expect(() => logger.setLevel('not-a-level')).toThrow(
            /Level you are trying to set is invalid/
        );
    });
});

describe('setLogStream()', () => {
    test('throws an Error on a non-writable argument', () => {
        expect(() => logger.setLogStream({})).toThrow(Error);
        expect(() => logger.setLogStream({})).toThrow(/invalid writable stream/);
    });

    test('throws an Error when called with null/undefined', () => {
        expect(() => logger.setLogStream(undefined)).toThrow(/invalid writable stream/);
        expect(() => logger.setLogStream(null)).toThrow(/invalid writable stream/);
    });

    test('returns the logger instance for chaining on a writable stream', () => {
        const stream = new PassThrough();
        const result = logger.setLogStream(stream);

        expect(result).toBe(logger);

        // restore the isolated no-op console for subsequent tests
        logger._customizedConsole = { log: () => {}, error: () => {} };
    });

    test('writes to the provided stream', (done) => {
        const chunks = [];
        const sink = new Writable({
            write(chunk, _enc, cb) {
                chunks.push(chunk.toString());
                cb();
            },
        });

        logger.setLogStream(sink);
        logger.log('streamed');

        // Node's Console flushes synchronously to the underlying writable.
        setImmediate(() => {
            expect(chunks.join('')).toContain('streamed');
            logger._customizedConsole = { log: () => {}, error: () => {} };
            done();
        });
    });
});

describe('parseStackFrame() (file/line parsing)', () => {
    const { parseStackFrame } = logger._internal;

    test('parses a POSIX path inside parens', () => {
        expect(
            parseStackFrame('at fn (/Users/me/repo/index.js:42:7)')
        ).toBe('/Users/me/repo/index.js:42');
    });

    test('parses a Windows path with drive letter inside parens', () => {
        expect(
            parseStackFrame('at fn (C:\\Users\\me\\repo\\index.js:42:7)')
        ).toBe('C:\\Users\\me\\repo\\index.js:42');
    });

    test('short-file mode returns just the basename for POSIX paths', () => {
        expect(
            parseStackFrame('at fn (/Users/me/repo/index.js:42:7)', true)
        ).toBe('index.js:42');
    });

    test('short-file mode returns just the basename for Windows paths', () => {
        expect(
            parseStackFrame('at fn (C:\\Users\\me\\repo\\index.js:42:7)', true)
        ).toBe('index.js:42');
    });

    test('parses anonymous frame without parens', () => {
        expect(
            parseStackFrame('    at /Users/me/repo/index.js:42:7')
        ).toBe('/Users/me/repo/index.js:42');
    });

    test('returns empty string on garbage input', () => {
        expect(parseStackFrame('')).toBe('');
        expect(parseStackFrame('not a stack frame')).toBe('');
        expect(parseStackFrame(undefined)).toBe('');
        expect(parseStackFrame(null)).toBe('');
    });

    test('returns empty string when the frame has no line number', () => {
        expect(parseStackFrame('at fn (/Users/me/repo/index.js)')).toBe('');
    });

    test('parses a POSIX file:line frame with no column (sourcemap-style)', () => {
        expect(
            parseStackFrame('at fn (/Users/me/repo/index.js:42)')
        ).toBe('/Users/me/repo/index.js:42');
    });

    test('parses a Windows file:line frame with no column', () => {
        expect(
            parseStackFrame('at fn (C:\\Users\\me\\repo\\index.js:42)')
        ).toBe('C:\\Users\\me\\repo\\index.js:42');
    });

    test('short-file mode works for sourcemap-style frames without column', () => {
        expect(
            parseStackFrame('at fn (/Users/me/repo/index.js:42)', true)
        ).toBe('index.js:42');
    });

    test('returns empty string when the would-be line number is not numeric', () => {
        expect(parseStackFrame('at fn (/Users/me/repo/index.js:not-a-line)')).toBe('');
    });

    test('returns empty string when only a Windows drive-letter colon is present', () => {
        expect(parseStackFrame('at fn (C:\\Users\\me\\repo\\index.js)')).toBe('');
    });
});

describe('isLevelValid()', () => {
    test('accepts every documented level', () => {
        for (const lvl of ['success', 'debug', 'info', 'warn', 'error', 'disable']) {
            expect(logger.isLevelValid(lvl)).toBe(true);
        }
    });

    test('rejects unknown levels', () => {
        expect(logger.isLevelValid('trace')).toBe(false);
        expect(logger.isLevelValid('')).toBe(false);
        expect(logger.isLevelValid(undefined)).toBe(false);
    });
});

describe('disable level hides everything', () => {
    test('no level method produces output when disabled', () => {
        logger.setLevel('disable');

        const before = logger.lastCommand;
        logger.success('hidden');
        logger.debug('hidden');
        logger.info('hidden');
        logger.warn('hidden');
        logger.error('hidden');

        expect(logger.lastCommand).toBe(before);

        logger.level = undefined;
    });
});
