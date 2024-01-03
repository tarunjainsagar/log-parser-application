import express from 'express';
import bodyParser from 'body-parser';
import { ConfigConstants } from '../constants/ConfigConstants';

const cors = require('cors');

export class Middlewares {
    static corsMiddleware = cors({ origin: ConfigConstants.CLIENT_ORIGIN });
    static jsonBodyParserMiddleware = bodyParser.json();
    static urlencodedBodyParserMiddleware = bodyParser.urlencoded({ extended: true });

    static attachMiddlewares(app: express.Express): void {
        app.use(Middlewares.corsMiddleware);
        app.use(Middlewares.jsonBodyParserMiddleware);
        app.use(Middlewares.urlencodedBodyParserMiddleware);
    }
}
