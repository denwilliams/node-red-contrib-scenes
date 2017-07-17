/**
 * Custom storage module for Node-RED
 * @module nodeRedStorage
 */

import * as when from 'when';
import * as NodeRED from 'node-red-interfaces';
import {existsSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

export class SceneStorage implements NodeRED.IStorageApi {

  private _nodeRedFlows: any;
	private _logger: NodeRed.Scenes.ILogger;
	private _credentialsPath: string;
	private _settingsPath: string;
	private _sessionsPath: string;

  constructor(nodeRedFlows: any, config: NodeRed.Scenes.IConfig, logger: NodeRed.Scenes.ILogger) {
    this._nodeRedFlows = nodeRedFlows;
		this._logger = logger;
		this._credentialsPath = join(config.userDir, 'credentials.json');
		this._settingsPath = join(config.userDir, 'settings.json');
		this._sessionsPath = join(config.userDir, 'sessions.json');
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
		const credentials = existsSync(this._credentialsPath)
			? JSON.parse(readFileSync(this._credentialsPath, 'utf8'))
			: null;
    return when.resolve(credentials);;
	}

	saveCredentials(credentials: NodeRED.ICredentials) : When.Promise<any> {
    writeFileSync(this._credentialsPath, JSON.stringify(credentials));
    return when.resolve(credentials);;
	}

	getSettings() : When.Promise<NodeRED.ISettings> {
		const settings = existsSync(this._settingsPath)
			? JSON.parse(readFileSync(this._settingsPath, 'utf8'))
			: null;
    return when.resolve(settings);;
	}

	saveSettings(settings: NodeRED.ISettings) : When.Promise<any> {
    writeFileSync(this._settingsPath, JSON.stringify(settings));
    return when.resolve(settings);;
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
		const sessions = existsSync(this._sessionsPath)
			? JSON.parse(readFileSync(this._sessionsPath, 'utf8'))
			: null;
    return when.resolve(sessions);;
  }

  saveSessions(sessions: NodeRED.ISessions) : When.Promise<any> {
    writeFileSync(this._sessionsPath, JSON.stringify(sessions));
    return when.resolve(sessions);;
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
