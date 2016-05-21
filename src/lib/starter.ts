//import * as NodeRED from 'node-red-interfaces';
import {IRuntime, IStorageApi, IRuntimeFlowConfig} from 'node-red-interfaces';
import * as http from 'http';
import * as express from 'express';

import {SceneManager} from './scene-manager';
import {SceneStorage} from './scene-storage';
import {SceneFlows} from './scene-flows';
import {ConsoleLogger} from './console-logger';
import {createSettings} from './settings';

module StarterModule {
  export function start(RED: IRuntime, opts: {
                          app?: express.Express,
                          server?: http.Server,
                          // nodes: NodeRED.INode[],
                          config?: NodeRedScenes.IConfig,
                          sceneManager?: NodeRedScenes.ISceneManager,
                          storageModule?: SceneStorage,
                          globalContext?: any,
                          flows?: SceneFlows,
                          logger?: NodeRedScenes.ILogger,
                          port?: number
                        } = {}) {

    const starter = new Starter(RED);
    return starter.start(opts);
  }

  export class Starter {
    private _RED: IRuntime;
    private _logger: NodeRedScenes.ILogger;
    private _reloadTimer: NodeJS.Timer;

    constructor(RED: IRuntime) {
      this._RED = RED;
    }

    start(
      opts: {
        app?: express.Express,
        server?: http.Server,
        // nodes: NodeRED.INode[],
        config?: NodeRedScenes.IConfig,
        sceneManager?: NodeRedScenes.ISceneManager,
        storageModule?: SceneStorage,
        globalContext?: any,
        flows?: SceneFlows,
        logger?: NodeRedScenes.ILogger,
        port?: number
      } = {}) {

      const { settings, config, flows, logger } = createSettings(opts);
      const sceneManager = opts.sceneManager || settings.functionGlobalContext.scene;

      this._logger = logger;

      let eventBus: any;

      const app: express.Express = opts.app || express();
      const server: http.Server = opts.server || http.createServer(app);

      sceneManager.onChanged((scene: string) => {
        flows.changeFlow(scene);
      });

      // Initialise the runtime with a server and settings
      this._RED.init(server, settings);
      app.use(config.redUrl, this._RED.httpAdmin);
      app.use(config.redApiUrl, this._RED.httpNode);

      flows.on('changed', () => {
        logger.info('Node RED flows have changed... reloading.');
        this.reload();
      });

      return this._RED.start()
      .then(() => {
        logger.info('Node RED has started.');
        // if (self._nodes) {
        //   self._nodes.forEach(node => this._red.nodes.addNode(node));
        // } else {
        //   logger.warn('No Node RED nodes provided. Did you miss something in config?');
        // }

        if (opts.port && server) {
          logger.info('Listening on port ' + opts.port);

          server.on('error', function(err: Error) {
              // if (err.errno === "EADDRINUSE") {
              //     RED.log.error(RED.log._("server.unable-to-listen", {listenpath:getListenPath()}));
              //     RED.log.error(RED.log._("server.port-in-use"));
              // } else {
              //     RED.log.error(RED.log._("server.uncaught-exception"));
              //     if (err.stack) {
              //         RED.log.error(err.stack);
              //     } else {
              //         RED.log.error(err);
              //     }
              // }
              process.exit(1);
          });
          server.listen(opts.port, null, () => {
            logger.info('Now listening on ' + opts.port);
          });
        }

        return {
          changeScene(sceneId: string) {
            flows.changeFlow(sceneId);
          },
          app,
          server
        };
      });
    }


    /**
     * [reload description]
     */
    reload() : void {
      this._logger.info('Stopping current Node RED flow...');
      // this._RED.nodes.stopFlows(); // dont need to do this any more
      this._RED.nodes.loadFlows();

      // if (this._reloadTimer) clearTimeout(this._reloadTimer);

      // this._reloadTimer = setTimeout(() => {
        this._logger.info('Starting new Node RED flow...');
        // this._RED.nodes.loadFlows();
        // this._RED.nodes.startFlows();
      // }, 1000);
    }
  }
}

export = StarterModule;
