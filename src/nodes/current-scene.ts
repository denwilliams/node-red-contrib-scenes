function registerCurrentSceneNode(RED: NodeRedNodes.IRed) {

  function CurrentSceneNode(config: any) {
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
    }
  }

  RED.nodes.registerType("current-scene", CurrentSceneNode);
};

export = registerCurrentSceneNode;
