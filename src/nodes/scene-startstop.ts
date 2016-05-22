/// <reference path="../def/index.d.ts"/>

function registerStartStopSceneNode(RED: NodeRed.Nodes.IRed) {
  // const thisNodeFactory: IThisNodeFactory = this;
  // const globalContext: IGlobalContext = thisNodeFactory.context().global;
  // const scene : ISceneManager = globalContext.get('scene');

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

  function SceneStartNode(config: any) {
    const node: NodeRed.Nodes.IThisNode = this;
    RED.nodes.createNode(node, config);

    const globalContext: NodeRed.Nodes.IGlobalContext = this.context().global;
    const scene : NodeRed.Scenes.ISceneManager = globalContext.get('scene');

    // send a message 500ms after init
    var t = setTimeout(init, 500);

    node.on('close', function() {
      clearTimeout(t);
    });

    function init() {
      var msg = {
        topic: 'scene/start',
        payload: scene.getCurrentId()
      };
      node.send(msg);
    }
  }

  function SceneStopNode(config: any) {
    const node: NodeRed.Nodes.IThisNode = this;
    const globalContext: NodeRed.Nodes.IGlobalContext = this.context().global;
    const scene : NodeRed.Scenes.ISceneManager = globalContext.get('scene');
    RED.nodes.createNode(node, config);

    scene.onChanged(init);
    var currScene = scene.getCurrentId();

    node.on('close', function() {
      scene.removeOnChanged(init);
    });

    function init() {
      var msg = {
        topic: 'scene/stop',
        payload: currScene
      };
      node.send(msg);

      // don't fire again
      scene.removeOnChanged(init);
    }
  }

  RED.nodes.registerType("scene start", SceneStartNode);
  RED.nodes.registerType("scene stop", SceneStopNode);
};

export = registerStartStopSceneNode;
