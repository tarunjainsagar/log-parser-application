import express, { Express } from 'express';
import { ConfigConstants } from './constants/ConfigConstants';
import { Middlewares } from './middlewares/Middlewares';

export class ExpressApp {
    private app: Express;

    constructor() {
        this.app = express();
        Middlewares.attachMiddlewares(this.app);
    }

    public getApp(): Express {
        return this.app;
    }

    public startServer(): void {
        this.app.listen(ConfigConstants.PORT, () => {
            console.log(`Server is running at http://localhost:${ConfigConstants.PORT}`);
        });
    }
}
