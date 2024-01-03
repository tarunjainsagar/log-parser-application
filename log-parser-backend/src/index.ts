import { ExpressApp } from './ExpressApp';
import { LogParserController } from './controllers/LogParserController';
import { LogParserService } from './services/LogParserService';
import { ApiConstants } from './constants/ApiConstants';
import multer from 'multer';

const expressApp = new ExpressApp();
const app = expressApp.getApp();

const logParserService = new LogParserService();
const logParserController = new LogParserController(logParserService);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(ApiConstants.PARSE_LOG, upload.single('logFile'), logParserController.parseLog);

expressApp.startServer();