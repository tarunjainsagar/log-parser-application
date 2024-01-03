import { ParsedLogModel } from '../models/ParsedLogModel';

export class LogParserService {
    parseLogs(logContent: string): ParsedLogModel[] {
        const logEntries = this.getLogEntries(logContent);
        const parsedLogs = this.parseEntries(logEntries);
        return parsedLogs;
    }

    private getLogEntries(logContent: string): string[] {
        return logContent.split('\n').filter((entry) => entry.trim() !== '');
    }

    private parseEntries(logEntries: string[]): ParsedLogModel[] {
        const parsedLogs: ParsedLogModel[] = [];

        for (const logEntry of logEntries) {
            try {
                const splitData = logEntry.split(' - ');
                const errorLevel = splitData[1].trim();

                if (this.isErrorOrWarn(errorLevel)) {
                    const timestamp = splitData[0].trim();
                    const jsonData = this.parseJsonData(splitData[2].trim());

                    const outputData: ParsedLogModel = {
                        timestamp: new Date(timestamp).getTime(),
                        loglevel: errorLevel,
                        transactionId: jsonData.transactionId,
                        err: jsonData.err || '',
                    };

                    parsedLogs.push(outputData);
                }
            } catch (error) {
                console.error('Error parsing log:', error);
            }
        }

        return parsedLogs;
    }

    private isErrorOrWarn(errorLevel: string): boolean {
        return errorLevel === 'error' || errorLevel === 'warn';
    }

    private parseJsonData(decodedJsonRawData: string): { transactionId: string; err: string } {
        const jsonData = JSON.parse(decodedJsonRawData.replace(/&quot;/g, '"'));
        return {
            transactionId: jsonData.transactionId,
            err: jsonData.err || '',
        };
    }
}
