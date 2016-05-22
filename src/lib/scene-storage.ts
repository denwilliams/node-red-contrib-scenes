/**
 * Custom storage module for Node-RED
 * @module nodeRedStorage
 */

import * as when from 'when';
import * as NodeRED from 'node-red-interfaces';

export class SceneStorage implements NodeRED.IStorageApi {

  private _nodeRedFlows : any;
  private _logger : NodeRed.Scenes.ILogger;

  constructor(nodeRedFlows: any, logger: NodeRed.Scenes.ILogger) {
    this._nodeRedFlows = nodeRedFlows;
    this._logger = logger;
  }

	init(settings: any) {
		return when.resolve();
	}

	getFlows() {
		return when.resolve(this._nodeRedFlows.getCurrentFlow());
	}

	saveFlows(flows: any) {
		return when.resolve(this._nodeRedFlows.saveCurrentFlow(flows));
	}

	getCredentials() {
		return when.resolve({});
	}

	saveCredentials(credentials: NodeRED.ICredentials) : When.Promise<any> {
		this._logger.debug(credentials);
    return null;
	}

	getSettings() : When.Promise<NodeRED.ISettings> {
    const settings: NodeRED.ISettings = null;
		return when.resolve(settings);
	}

	saveSettings(settings: NodeRED.ISettings) : When.Promise<any> {
		// console.log(settings);
    return null;
	}

	getAllFlows() {
		return when.resolve([]);
	}

	getFlow(fn: any) {
		return when.reject(new Error());
	}

	saveFlow(fn: any, data: any) {
		// console.log(fn, data);
	}

  getSessions() : When.Promise<NodeRED.ISessions> {
    return null;
  }

  saveSessions(sessions: NodeRED.ISessions) : When.Promise<any> {
    return null;
  }

	getLibraryEntry(type: string, path: any) {
    switch(type) {
      case 'flows':
        return this.getAllFlows();
    }
    // console.log('getLibraryEntry', type, path);
	}

	saveLibraryEntry(type: string, path: string, meta: any, body: any) {
		// console.log(type, path, meta, body);
	}
}
