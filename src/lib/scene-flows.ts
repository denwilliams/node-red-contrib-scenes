import {existsSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {EventEmitter} from 'events';
import * as NodeRED from 'node-red-interfaces';

export class SceneFlows extends EventEmitter implements NodeRED.IRuntimeFlowConfig {
  static COMMON_DEFAULT = [
    { type: 'tab', id: 'tab.common', label: 'Common' }
  ];

  private _logger: NodeRed.Scenes.ILogger;
  private _flows: NodeRed.Scenes.HashTable<any>;
  private _flowsPath: string;
  private _timeout: NodeJS.Timer;
  private _selected: string;

  constructor(config: NodeRed.Scenes.IConfig, logger: NodeRed.Scenes.ILogger) {
    super();

    const self = this;

    this._flows = {};
    this._selected = config.initialFlow || 'default';

    this._logger = logger;

    this._flowsPath = join(config.userDir, 'flows.json');

    if (existsSync(this._flowsPath)) {
      logger.info('Loading saved flows from file: ' + this._flowsPath);
      this._flows = require(this._flowsPath);
    }
  }

  get current() : any {
    return this._flows[this._selected];
  }

  getCurrentFlow() : any {
    this._logger.debug('Getting flows for scene: ' + this._selected);
    var f = this._flows[this._selected] || [
      { type: 'tab', id: 'tab.'+this._selected, label: this._selected },
      { type: 'current-scene', id: 'current-scene.'+this._selected, name:'', x:75, y:20, z:'tab.'+this._selected, wires:[]}
    ];

    var common = this._flows['common'] || SceneFlows.COMMON_DEFAULT;

    f = f.concat(common);

    return f;
  }

  saveCurrentFlow(data: any) : void {
    var current: any[] = [];
    var common: any[] = [];

    if (data.length > 0 && data[0].id !== 'tab.' + this._selected) {
      throw new Error('Cannot deploy flow - scene has been changed. Please change scene to '+data[0].id+' then try again. (Scene is currently '+this._selected+')');
    }

    var commonTabs = data.filter(function (item: any) {
      if (item.type !== 'tab') return false;
      if (!item.label) return false;

      var strStart = item.label.substring(0, 6);
      return strStart === 'Common';
    })
    .map(function (item: any) {
      return item.id;
    });

    data.forEach(function(item: any) {
      if (commonTabs.indexOf(item.id) >= 0 || commonTabs.indexOf(item.z) >= 0) {
        common.push(item);
      } else {
        current.push(item);
      }
    });

    data.scene = this._selected;
    this._logger.info('Saving flows for scene: ' + this._selected);

    this._flows[this._selected] = current;
    this._flows['common'] = common;

    writeFileSync(this._flowsPath, JSON.stringify(this._flows));
  }

  changeFlow(newId: string) {
    this._selected = newId;
    this._logger.debug('Changing flows to scene: ' + newId);
    writeFileSync(this._flowsPath, JSON.stringify(this._flows));
    this.emit('changed', newId);
  }
}
