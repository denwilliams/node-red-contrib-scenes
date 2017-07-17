import * as NodeRED from 'node-red-interfaces';
import * as when from 'when';
import {SceneManager} from './scene-manager';
import {IStorageApi, IRuntimeFlowConfig} from 'node-red-interfaces';
import {SceneStorage} from './scene-storage';
import {SceneFlows} from './scene-flows';
import {ConsoleLogger} from './console-logger';
import {join} from 'path';

module Settings {
  export function createSettings(
        opts: {
          config?: NodeRed.Scenes.IConfig,
          sceneManager?: NodeRed.Scenes.ISceneManager,
          storageModule?: SceneStorage,
          globalContext?: any,
          flows?: SceneFlows,
          logger?: NodeRed.Scenes.ILogger
        })
        : {
          settings: NodeRED.ISettings,
          flows: SceneFlows,
          scenes: NodeRed.Scenes.ISceneManager,
          config: NodeRed.Scenes.IConfig,
          logger: NodeRed.Scenes.ILogger
        } {

    const defaultConfig: NodeRed.Scenes.IConfig = {
      nodesDir: join(__dirname, '../nodes/'),
      userDir: join(__dirname, '../data/'),
      initialFlow: 'default',
      redUrl: '/',
      redApiUrl: '/api'
    };
    const config: NodeRed.Scenes.IConfig = opts.config || defaultConfig;
    const logger: NodeRed.Scenes.ILogger = opts.logger || new ConsoleLogger();
    const scenes: NodeRed.Scenes.ISceneManager = opts.sceneManager || new SceneManager();
    const functionGlobalContext: any = opts.globalContext || {};
    const flows: SceneFlows = opts.flows || new SceneFlows(config, logger);
    const storageModule: SceneStorage = opts.storageModule || new SceneStorage(flows, config, opts.logger);

    functionGlobalContext.scene = scenes;

    // Create the settings object
    const settings : NodeRED.ISettings = {
      paletteCategories: ['scene', 'function', 'input', 'output'],
      functionGlobalContext,
      storageModule,
      // httpAdminRoot: nodeRedUrl,
      // httpNodeRoot: nodeRedApiUrl,
      userDir: config.userDir || defaultConfig.userDir,
      nodesDir: null, //config.nodesDir || defaultConfig.nodesDir,
      flowFile: (config.userDir || defaultConfig.userDir) + (config.initialFlow || defaultConfig.initialFlow),
      // adminAuth: {
      //   type: 'credentials',
      //   users: [
      //     {
      //       username: 'admin',
      //       password: '$2a$08$Hfo8ZCH3gzErDmH3piUL/.WsihVmHo8pHD3SKpoZ9XC8ip/HwrhVC',
      //       permissions: '*'
      //     }
      //   ]
      // },
      set: function(what: any, data: any) {
        return when.resolve();
      },
      verbose: true,
      logging: {
        "custom": {
          level: "info",
          // metrics: true,
          // auditOn: true,
          handler: function(settings: any) {
            return function(log: any) {
              logger.debug(log.msg);
            }
          }
        }
      }
    };

    return {settings, flows, scenes, config, logger};
  }
}

export = Settings;
