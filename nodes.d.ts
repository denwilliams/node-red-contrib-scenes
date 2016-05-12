declare module NodeRedNodes {
  interface IRed {
    nodes: IRedNodes
    log: any
    comms: any
  }

  interface IGlobalContext {
    get(key: String): any
    set(key: String, value: any): void
  }

  // interface IThisNodeFactory {
  //   context() : INodeFactoryContext
  // }

  interface INodeFactoryContext {
    global: IGlobalContext
  }

  interface IThisNode {
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

  interface IStatusUpdate {
    fill: String
    shape: StatusShape
    text: String
  }

  interface IMessage {
    topic: String
    payload: any
  }

  type NodeRegistration = (RED: IRed) => void
  type NodeInitializer = (config: any) => void
  type MessageCallback = (msg: IMessage) => void

  interface IRedNodes {
    createNode(node: IThisNode, config: any) : void
    registerType(name: String, nodeInit: NodeInitializer) : void
  }
}
