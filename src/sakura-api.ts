import {SakuraApi} from '@sakuraapi/core';
import {json} from 'body-parser';
import * as cors from 'cors';
import * as debugInit from 'debug';
import * as helmet from 'helmet';
import {ConfigApi} from './api/config.api';
import {BootstrapIndexes} from './config/bootstrap/bootstrap-indexes';
import {LogService} from './services/log-service';
import {UserModel} from './models/user-model';
import {UserApi} from './api/user-api';

const debug = debugInit('app:bootstrap');

export class Bootstrap {
  private log: LogService;
  private sapi: SakuraApi;
  private shuttingDown = false;

  async boot(): Promise<SakuraApi> {
    debug('boot called');

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    this.sapi = new SakuraApi({
      baseUrl: '/api',
      models: [
        UserModel
      ],
      plugins: [],
      providers: [
        LogService
      ],
      routables: [
        ConfigApi,
        UserApi
      ]
    });

    this.log = this.sapi.getProvider(LogService);

    // SakuraApi setup
    this.sapi.addMiddleware(cors(this.sapi.config.cors), 0);
    this.sapi.addMiddleware(helmet(), 0);
    this.sapi.addMiddleware(json());

    // Add debug tracing
    if (this.sapi.config.TRACE_REQ === 'true') {
      this.sapi.addMiddleware((req, res, next) => {
        this.log.info({
          body: req.body,
          method: req.method,
          url: req.url
        });
        next();
      });
    }

    await this.sapi.dbConnections.connectAll();

    // Bootstrap items
    const wait = [];
    wait.push(new BootstrapIndexes(this.sapi).run());
    await Promise.all(wait);

    process.once('SIGINT', () => this.shutdownServer.call(this, 'SIGINT'));
    process.once('SIGTERM', () => this.shutdownServer.call(this, 'SIGTERM'));
    process.once('SIGUSR1', () => this.shutdownServer.call(this, 'SIGUSR1'));
    process.once('SIGUSR2', () => this.shutdownServer.call(this, 'SIGUSR2'));

    return this.sapi;
  }

  async shutdownServer(signal: string): Promise<void> {
    debug(`shutdownServer called by ${signal}`);

    if (this.shuttingDown) {
      return;
    }

    this.shuttingDown = true;

    this.log.info(`Shutting down Donation Server (signal: ${signal})`);

    await this.sapi
      .close()
      .catch((err) => this.log.error('Unable to shutdown SakuraApi', err));

    this.log.info('And now his watch is ended');
    process.exit(0);
  }

}
