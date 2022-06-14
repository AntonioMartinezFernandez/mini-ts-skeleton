// Environment
import {
  NODE_ENV,
  PORT,
  BASE_ROUTE,
  ORIGIN,
  CREDENTIALS,
} from './config/environment';

// Databases
import { dbConnection } from './db/mongo/mongodb';

// Dependencies
import { IRoute } from './entities/route.interface';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import chalk from 'chalk';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import { connect, set } from 'mongoose';
import routerLoader from './config/routesLoader';
import { KataRoute } from './infra/routes/kata.router';

export default class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
  }

  public connectToMongoDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url);
  }

  public loadMiddlewares() {
    if (this.env !== 'production') {
      this.app.use(morgan('combined'));
    }
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  public async loadRoutes() {
    const routes = await routerLoader();
    const basePath = BASE_ROUTE;

    // Specific route for katas
    const kataRoute = new KataRoute();
    this.app.use('/kata', kataRoute.router);
    console.log(chalk.greenBright('Routes for "/kata" endpoint loaded'));

    // API routes
    routes.forEach((route: IRoute) => {
      this.app.use(basePath + '/', route.router);

      console.log(
        chalk.greenBright(
          'Router for "' + basePath + route.path + '" endpoints loaded',
        ),
      );
    });
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(chalk.blueBright(`======= ENV: ${this.env} =======`));
      console.log(
        chalk.blueBright(`🚀 App listening on port `) +
          chalk.bgCyan.bold(` ${this.port} `),
      );
      console.log(chalk.blueBright(`================================`));
    });
  }
}
