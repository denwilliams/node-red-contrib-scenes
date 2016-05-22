/// <reference path="src/def/scenes.d.ts"/>
/// <reference path="src/def/nodes.d.ts"/>

declare module 'node-red-contrib-scenes' {

  // taken from when .d.ts
  interface Promise<T> {
      catch<U>(onRejected?: (reason: any) => U | Promise<U>): Promise<U>;

      catch<U>(filter: (reason: any) => boolean, onRejected?: (reason: any) => U | Promise<U>): Promise<U>;

      // Make sure you test any usage of these overloads, exceptionType must
      // be a constructor with prototype set to an instance of Error.
      catch<U>(exceptionType: any, onRejected?: (reason: any) => U | Promise<U>): Promise<U>;

      finally(onFulfilledOrRejected: Function): Promise<T>;

      ensure(onFulfilledOrRejected: Function): Promise<T>;
      //
      // inspect(): Snapshot<T>;

      yield<U>(value: U | Promise<U>): Promise<U>;

      else(value: T): Promise<T>;
      orElse(value: T): Promise<T>;

      tap(onFulfilledSideEffect: (value: T) => void): Promise<T>;

      delay(milliseconds: number): Promise<T>;

      timeout(milliseconds: number, reason?: any): Promise<T>;

      with(thisArg: any): Promise<T>;
      withThis(thisArg: any): Promise<T>;

      otherwise<U>(onRejected?: (reason: any) => U | Promise<U>): Promise<U>;

      otherwise<U>(predicate: (reason: any) => boolean, onRejected?: (reason: any) => U | Promise<U>): Promise<U>;

      // Make sure you test any usage of these overloads, exceptionType must
      // be a constructor with prototype set to an instance of Error.
      otherwise<U>(exceptionType: any, onRejected?: (reason: any) => U | Promise<U>): Promise<U>;

      then<U>(onFulfilled: (value: T) => U | Promise<U>, onRejected?: (reason: any) => U | Promise<U>, onProgress?: (update: any) => void): Promise<U>;

      // spread<T>(onFulfilled: _.Fn0<Promise<T> | T>): Promise<T>;
      // spread<A1, T>(onFulfilled: _.Fn1<A1, Promise<T> | T>): Promise<T>;
      // spread<A1, A2, T>(onFulfilled: _.Fn2<A1, A2, Promise<T> | T>): Promise<T>;
      // spread<A1, A2, A3, T>(onFulfilled: _.Fn3<A1, A2, A3, Promise<T> | T>): Promise<T>;
      // spread<A1, A2, A3, A4, T>(onFulfilled: _.Fn4<A1, A2, A3, A4, Promise<T> | T>): Promise<T>;
      // spread<A1, A2, A3, A4, A5, T>(onFulfilled: _.Fn5<A1, A2, A3, A4, A5, Promise<T> | T>): Promise<T>;

      done<U>(onFulfilled: (value: T) => void, onRejected?: (reason: any) => void): void;

      fold<U, V>(combine: (value1: T, value2: V) => U | Promise<U>, value2: V | Promise<V>): Promise<U>;
  }

  export interface INodeRedSettings {
    paletteCategories: string[],
    functionGlobalContext: any,
    storageModule: any, // IStorageModule
    userDir: string,
    nodesDir: string,
    flowFile: string,
    set: Function,
    verbose: boolean,
    logging?: any
  }

  export class EventEmitter {
      addListener(event: string, listener: Function): this;
      on(event: string, listener: Function): this;
      once(event: string, listener: Function): this;
      removeListener(event: string, listener: Function): this;
      removeAllListeners(event?: string): this;
      setMaxListeners(n: number): this;
      getMaxListeners(): number;
      listeners(event: string): Function[];
      emit(event: string, ...args: any[]): boolean;
      listenerCount(type: string): number;
  }

  export function createSettings(opts: {
      config?: NodeRed.Scenes.IConfig;
      sceneManager?: NodeRed.Scenes.ISceneManager;
      // storageModule?: SceneStorage;
      globalContext?: any;
      // flows?: SceneFlows;
      logger?: NodeRed.Scenes.ILogger;
  }): {
      settings: INodeRedSettings;
      flows: any; // NodeRED.IRuntimeFlowConfig
      scenes: NodeRed.Scenes.ISceneManager;
      config: NodeRed.Scenes.IConfig;
      logger: NodeRed.Scenes.ILogger;
  };

  export class SceneManager extends EventEmitter {
    constructor(initialScene?: string);
    getCurrentId(): string;
    set(sceneId: string): void;
    onChanged(callback: Function): void;
    removeOnChanged(callback: Function): void;
  }

  export function start(RED: any, //IRuntime,
    opts?: {
      app?: any; //express.Express;
      server?: any; //http.Server;
      config?: NodeRed.Scenes.IConfig;
      sceneManager?: NodeRed.Scenes.ISceneManager;
      storageModule?: any; //SceneStorage;
      globalContext?: any;
      flows?: any; // NodeRED.IRuntimeFlowConfig
      logger?: NodeRed.Scenes.ILogger;
      port?: number;
  }): Promise<{
      changeScene(sceneId: string): void;
      app: any; //express.Express;
      server: any; //http.Server;
  }>;
  class Starter {
      constructor(RED: any); // IRuntime
      start(opts?: {
          app?: any; //express.Express;
          server?: any; // http.Server;
          config?: NodeRed.Scenes.IConfig;
          sceneManager?: NodeRed.Scenes.ISceneManager;
          storageModule?: any; //SceneStorage;
          globalContext?: any;
          flows?: any; //NodeRED.IRuntimeFlowConfig
          logger?: NodeRed.Scenes.ILogger;
          port?: number;
      }): Promise<{
          changeScene(sceneId: string): void;
          app: any; //express.Express;
          server: any; //http.Server;
      }>;
      reload(): void;
  }
}
