# node-red-contrib-scenes

Scenes for Node RED

## Use

```js
var scenes = require('node-red-contrib-scenes');
var SceneManager = scenes.SceneManager;
var initialFlow = 'default';

function run() {
  var sceneManager = new SceneManager();
  var context = {scene: sceneManager};
//  var config = { dataPath: dataPath, initialFlow: initialFlow };
//  var app = express();
//  var nodes = [];
  // var logger = {
  //   debug: log,
  //   info: log,
  //   warn: log,
  //   error: log
  // };
  return main.start({ context: context, config: config, app:app, nodes:nodes, logger:logger, sceneManager:sceneManager })
  .then(res => {
    res.server.listen(3210);
  })
};

run();
```
