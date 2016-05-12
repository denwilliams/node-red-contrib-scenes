function registerSetSceneNode(RED: NodeRedNodes.IRed) {
  function SetSceneNode(config: any) {
    console.log('NODE scene');
    const node: NodeRedNodes.IThisNode = this;
    RED.nodes.createNode(this, config);
    const flowContext: any = this.context().flow;
    let globalContext: NodeRedNodes.IGlobalContext = this.context().global;
    const scene : NodeRedScenes.ISceneManager = globalContext.get('scene');

    const sceneId = config.sceneId;

    node.on('input', function(msg: NodeRedNodes.IMessage) {
      const id: String = sceneId || msg.payload;
      console.log('ON SCENE INPUT', id);
      console.log('ISceneManager', scene);
      scene.set(id);
    });
  }

  RED.nodes.registerType('scene', SetSceneNode);
};

export = registerSetSceneNode;
