declare module NodeRed {

  export module Nodes {

    export interface IRed {
      nodes: IRedNodes
      log: any
      comms: any
    }

    export interface IGlobalContext {
      get(key: String): any
      set(key: String, value: any): void
    }

    // interface IThisNodeFactory {
    //   context() : INodeFactoryContext
    // }

    export interface INodeFactoryContext {
      global: IGlobalContext
    }

    export interface IThisNode {
      id: string
      type: string
      on(event: NodeEvent, callback: MessageCallback) : void
      send(msg: IMessage) : void
      status(newStatus: IStatusUpdate) : void
      log(msg: string) : void
      warn(msg: string) : void
      error(msg: string) : void
    }

    type StatusShape = "dot" | "ring";
    type StatusFill = "red" | "green" | "yellow" | "blue" | "grey";
    type NodeEvent = "input" | "close"

    export interface IStatusUpdate {
      fill: String
      shape: StatusShape
      text: String
    }

    export interface IMessage {
      topic: String
      payload: any
    }

    // type NodeRegistration = (RED: IRed) => void
    export type NodeInitializer = (config: any) => void
    export type MessageCallback = (msg: IMessage) => void

    export interface IRedNodes {
      createNode(node: IThisNode, config: any) : void
      registerType(name: String, nodeInit: NodeInitializer) : void
    }

  }

}
