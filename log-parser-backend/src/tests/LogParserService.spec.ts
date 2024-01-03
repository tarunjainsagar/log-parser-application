import { LogParserService } from '../services/LogParserService';
import { ParsedLogModel } from '../models/ParsedLogModel';

describe('LogParserService', () => {
    let logParserService: LogParserService;

    beforeEach(() => {
        logParserService = new LogParserService();
    });

    it('should parse logs successfully', () => {
        const logContent = '2021-08-09T02:12:51.254Z - error - {"transactionId":"123","err":"Error message"}\n';
        const expectedParsedLogs: ParsedLogModel[] = [{
            timestamp: 1628475171254,
            loglevel: 'error',
            transactionId: '123',
            err: 'Error message',
        }];

        const result = logParserService.parseLogs(logContent);

        expect(result).toEqual(expectedParsedLogs);
    });

    it('should handle empty log content', () => {
        const logContent = '';
        const expectedParsedLogs: ParsedLogModel[] = [];

        const result = logParserService.parseLogs(logContent);

        expect(result).toEqual(expectedParsedLogs);
    });

    it('should handle malformed log entry', () => {
        const logContent = 'Malformed log entry\n';
        const expectedParsedLogs: ParsedLogModel[] = [];

        const result = logParserService.parseLogs(logContent);

        expect(result).toEqual(expectedParsedLogs);
    });

    it('should handle parsing error and log to console', () => {
        const logContent = '2021-08-09T02:12:51.254Z - error - {"invalidJson"}\n';
        const expectedParsedLogs: ParsedLogModel[] = [];

        // Mock the console.error to avoid actual logging during the test
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const result = logParserService.parseLogs(logContent);

        expect(result).toEqual(expectedParsedLogs);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error parsing log:', expect.any(Error));

        // Restore the original console.error function
        consoleErrorSpy.mockRestore();
    });

    it('should parse multiple log entries', () => {
        const logContent = `
            2021-08-09T02:12:51.253Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}
            2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}
            2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}
        `;
        const expectedParsedLogs: ParsedLogModel[] = [
            {
                timestamp: 1628475171253,
                loglevel: 'warn',
                transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
                err: '',
            },
            {
                timestamp: 1628475171259,
                loglevel: 'error',
                transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
                err: 'Not found',
            },
        ];

        const result = logParserService.parseLogs(logContent);

        expect(result).toEqual(expectedParsedLogs);
    });

    it('should handle logs with additional properties', () => {
        const logContent = '2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}\n';
        const expectedParsedLogs: ParsedLogModel[] = [
            {
                timestamp: 1628475171259,
                loglevel: 'error',
                transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
                err: 'Not found',
            },
        ];

        const result = logParserService.parseLogs(logContent);

        expect(result).toEqual(expectedParsedLogs);
    });
});
