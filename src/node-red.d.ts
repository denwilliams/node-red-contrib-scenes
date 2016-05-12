declare module 'node-red-interfaces' {

  import * as http from 'http';
  import * as express from 'express';

  export interface IRuntime {
    httpAdmin: express.Router;
    httpNode: express.Router;
    server: http.Server;
    auth: IAuth;
    comms: IComms;
    library: ILibrary;
    log: ILog;
    nodes: INodes;
    settings: IRuntimeSettings;
    util: IUtil;

    init(server: http.Server, settings: ISettings) : void;
    start() : When.Promise<any>;
    stop() : void;
    version() : void;
  }

  export interface IUtil {

  }

  export interface IRuntimeSettings {

  }

  export interface INodes {
    addNode(node: any) : void;
    loadFlows() : void;
    stopFlows() : void;
    startFlows() : void;
  }

  export interface INode {}
  export interface ILog {}
  export interface IAuth {}
  export interface IComms {}
  export interface ILibrary {}

  export interface IStorageApi {
    init(settings: ISettings) : When.Promise<any>;
    getFlows() : When.Promise<IRuntimeFlowConfig>;
    saveFlows(flows: IFlowConfig) : When.Promise<any>;
    getCredentials() : When.Promise<IRuntimeCredentials>;
    saveCredentials(credentials: ICredentials) : When.Promise<any>;
    getSettings() : When.Promise<ISettings>;
    saveSettings(settings: ISettings) : When.Promise<any>;
    getSessions() : When.Promise<ISessions>;
    saveSessions(sessions: ISessions) : When.Promise<any>;
    /**
     * the type of library entry, eg flows, functions, templates
     * @param  {[type]} type - the type of library entry, eg flows, functions, templates
     * @param  {[type]} name - the pathname of the entry to return
     * @return {[type]}      - Returns a promise that resolves with the result
     */
    getLibraryEntry(type: any, name: any) : any
    saveLibraryEntry(type: any, name: any, meta: any, body: any) : void
  }

  export interface ISettings {
    paletteCategories: string[],
    functionGlobalContext: any,
    storageModule: IStorageApi,
    userDir: string,
    nodesDir: string,
    flowFile: string,
    set: Function,
    verbose: boolean,
    logging?: any
  }

  export interface IRuntimeFlowConfig {
    getCurrentFlow() : any
    saveCurrentFlow(data: any) : void
  }

  export interface IFlowConfig {}
  export interface ISessions {}
  export interface IRuntimeCredentials {}
  export interface ICredentials {}
}

declare module 'node-red' {
  import * as NodeRED from 'node-red-interfaces';

  var RED: NodeRED.IRuntime;
  export = RED;
}


/// <reference path="../node_modules/inversify/type_definitions/inversify.d.ts"/>
