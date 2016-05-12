// import * as RED from 'node-red';
import * as NodeRED from 'node-red-interfaces';

import * as express from 'express';
import * as http from 'http';
import { join } from 'path';
import * as when from 'when';
import * as fs from 'fs';

const DEFAULT_FLOWS_DIR: string = join(__dirname, '../flows/');

class NodeREDLauncher {
  private _red : NodeRED.IRuntime;
  private _logger : NodeRedScenes.ILogger;
  private _nodes : NodeRED.INode[];
  private _nodeRedFlows : any;
  private _nodeRedStorage : NodeRED.IStorageApi;
  private _reloadTimer: NodeJS.Timer;

  /**
   * Creates a new instance of NodeREDLauncher
   * @param  {any}                        globalContext  [description]
   * @param  {NodeRED.IRuntimeFlowConfig} nodeRedFlows   flows
   * @param  {NodeRED.IStorageApi}        nodeRedStorage custom storage
   * @param  {http.Server}                webServer      http server to publish on
   * @param  {express.Router}             app            express router to attach to
   * @param  {NodeRED.INode[]}            nodes          nodes
   * @param  {NodeRED.IConfig}            config         configuration data
   * @param  {NodeRED.ILogger}            logger         logger target
   */
  constructor(
    RED: NodeRED.IRuntime,
    globalContext: any,
    nodeRedFlows: NodeRED.IRuntimeFlowConfig,
    nodeRedStorage: NodeRED.IStorageApi,
    app: express.Router,
    server: http.Server,
    nodes: NodeRED.INode[],
    config: NodeRedScenes.IConfig,
    logger: NodeRedScenes.ILogger
  ) {
    this._red = RED;
    this._logger = logger;
    this._nodes = nodes;
    this._nodeRedFlows = nodeRedFlows;
    this._nodeRedStorage = nodeRedStorage;

    const nodeRedData: string = config.userDir || DEFAULT_FLOWS_DIR;
    const nodeRedNodes: string = join(__dirname, '../nodes/');
    const userDir: string = join(__dirname, '../nodes/');
    const nodeRedUrl: string = config.redUrl || '/red';
    const nodeRedApiUrl: string = config.redApiUrl || '/api';
    const initialFlow : string = 'main.flow';

    let evt: any = null;


    // Initialise the runtime with a server and settings
    // RED.init(server, settings);
    // RED.init(server, settings);
    // app.use(settings.httpAdminRoot, RED.httpAdmin);
    // app.use(settings.httpNodeRoot, RED.httpNode);
    //
    // this._nodeRedFlows.on('changed', () => {
    //   this._logger.info('Node RED flows have changed... reloading.');
    //   this.reload();
    // });

    // DEBUG:
    //
    // RED.httpNode.__aaa = 'a';
    //
    // function TestNode(n) {
    //   RED.nodes.createNode(this,n);
    // }
    //
    // RED.nodes.add
  }

  /**
   * [start description]
   * @return {when.Promise<any>} [description]
   */
  start() : when.Promise<any> {
    const self = this;

    // Start the runtime
    return this._red.start()
    .then(() => {
      this._logger.info('Node RED has started.');
      if (self._nodes) {
        self._nodes.forEach(function(node) {
          this._red.nodes.addNode(node);
        });
      } else {
        self._logger.warn('No Node RED nodes provided. Did you miss something in config?');
      }
    });
  }

  /**
   * [reload description]
   */
  reload() : void {
    const self = this;

    self._logger.info('Stopping current Node RED flow...');
    this._red.nodes.stopFlows();

    if (this._reloadTimer) clearTimeout(this._reloadTimer);

    this._reloadTimer = setTimeout(() => {
      self._logger.info('Starting new Node RED flow...');
      try {
        this._red.nodes.loadFlows();
        this._red.nodes.startFlows();
      } catch(err) {
        self._logger.error(err.message + ' >> \n' + err.stack);
      }
    }, 1000);
  }
}

export = NodeREDLauncher;
