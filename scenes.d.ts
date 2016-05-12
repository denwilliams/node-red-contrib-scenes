// import {ISettings} from 'node-red-interfaces';

declare module NodeRedScenes {

  export interface ILogger {
    debug(arg1: any) : void
    info(arg1: any) : void
    warn(arg1: any) : void
    error(arg1: any) : void
  }

  export interface IConfig {
    nodesDir: string
    userDir: string
    initialFlow: string
    redUrl: string
    redApiUrl: string
  }

  export interface HashTable<V> {
    [key: string]: V
  }


  interface ISceneManager {
    getCurrentId() : String
    set(newSceneId: String) : void
    onChanged(callback: Function) : void
    removeOnChanged(callback: Function) : void
  }
  //
  // interface INodeRedSceneSettings extends ISettings {
  //   sceneManager: ISceneManager
  // }
}
