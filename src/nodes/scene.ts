function registerSetSceneNode(RED: NodeRed.Nodes.IRed) {
  function SetSceneNode(config: any) {
    const node: NodeRed.Nodes.IThisNode = this;
    RED.nodes.createNode(this, config);

    const flowContext: any = this.context().flow;
    let globalContext: NodeRed.Nodes.IGlobalContext = this.context().global;
    const scene : NodeRed.Scenes.ISceneManager = globalContext.get('scene');

    const sceneId = config.sceneId;

    node.on('input', function(msg: NodeRed.Nodes.IMessage) {
      const id: String = sceneId || msg.payload;
      scene.set(id);
    });
  }

  RED.nodes.registerType('scene', SetSceneNode);
};

export = registerSetSceneNode;
