import express from 'express';
import { LogParserService } from '../services/LogParserService';

export class LogParserController {
    private logParserService: LogParserService;

    constructor(logParserService: LogParserService) {
        this.logParserService = logParserService;
    }

    parseLog = (req: express.Request, res: express.Response): void => {
        try {
            if (!req.file) {
                throw new Error('No file provided');
            }

            const logContent = req.file.buffer.toString();
            const parsedLogs = this.logParserService.parseLogs(logContent);
            res.json(parsedLogs);
        } catch (error: any) {
            res.status(500).json({ error: (error as Error).message });
        }
    };
}
