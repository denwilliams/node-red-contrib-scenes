import {EventEmitter} from 'events';

export class SceneManager extends EventEmitter implements NodeRedScenes.ISceneManager {
  private _currentId: string;

  constructor(initialScene: string = 'default') {
    super();
    this._currentId = initialScene;
  }

  getCurrentId() : string {
    return this._currentId;
  }

  set(sceneId: string) {
    this._currentId = sceneId;
    this.emit('changed', sceneId);
  }

  onChanged(callback: Function) : void {
    this.on('changed', callback);
  }

  removeOnChanged(callback: Function) : void {
    this.removeListener('changed', callback);
  }
}
