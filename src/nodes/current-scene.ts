const nodeFactory : NodeRedNodes.NodeRegistration = function(RED: NodeRedNodes.IRed) {
  // const thisNodeFactory: IThisNodeFactory = this;
  // console.log('thisNodeFactory', typeof thisNodeFactory, thisNodeFactory);
//  const globalContext: IGlobalContext = thisNodeFactory.context().global;
//  const scene : ISceneManager = globalContext.get('scene');
  //
  // function createNode(config: any) {
  //   const node: IThisNode = this;
  //
  //   RED.nodes.createNode(node, config);
  //   const sceneId = config.sceneId;
  //
  //   node.on('input', function(msg: IMessage) {
  //     const id: String = sceneId || msg.payload;
  //     scene.set(id);
  //   });
  // }

  function Node(config: any) {
    console.log('NODE scene current', config.id);
    // setTimeout(() => RED.comms.publish('debug', {msg:1}), 10000);
    const node: NodeRedNodes.IThisNode = this;
    RED.nodes.createNode(this, config);

    const flowContext: any = this.context().flow;
    let globalContext: NodeRedNodes.IGlobalContext = this.context().global;

    const scene : NodeRedScenes.ISceneManager = globalContext.get('scene');

    node.status({ fill:"green", shape:"dot", text:"connected" });

    const origScene = scene.getCurrentId();

    setTimeout(updateStatus, 10);
    scene.onChanged(updateStatus);

    node.on('close', function() {
      node.log('Current scene node is closing: ' + config.id);
      scene.removeOnChanged(updateStatus);
    });

    function updateStatus() {
      var newScene = scene.getCurrentId();
      // we show it as RED if the scene is different from when loaded (ie: has changed)
      var color = (newScene !== origScene) ? 'red' : 'blue';
      node.status({
        fill: color,
        shape: 'dot',
        text: newScene
      });
      console.log('update status', node.id, color);
    }
  }

  RED.nodes.registerType("current-scene",Node);
};

export = nodeFactory;
