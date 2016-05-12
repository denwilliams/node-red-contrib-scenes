// import * as NodeRED from 'node-red-interfaces';
// import * as http from 'http';
// import * as express from 'express';
//
// import SceneStorage = require('./scene-storage');
// import SceneFlows = require('./scene-flows');
// import NodeREDLauncher = require('./launcher');
// import ConsoleLogger = require('./console-logger');
//
//
// // export function startTest() {
// //   const context = {};
// //   const config: NodeRED.IConfig = {dataPath: __dirname, initialFlow: 'default'};
// //   const app = express();
// //   const nodes: NodeRED.INode[] = [];
// //   const log = str => console.log(new Date().toISOString(), str);
// //   const logger: NodeRED.ILogger = {
// //     debug: log,
// //     info: log,
// //     warn: log,
// //     error: log
// //   };
// //
// //   app.listen(3210);
// //   return start({context, config, app, nodes, logger});
// // }
//
// //
// //
// // eventBus.on('scene', 'changed', function(e) {
// //   var scene = e.data;
// //   logger.info('Scene changed... preparing to change flows. New scene: ' + scene.id);
// //   if (self._timeout) clearTimeout(self._timeout);
// //
// //   // change scene after timeout
// //   // give time for scene stop to process
// //   self._timeout = setTimeout(function () {
// //     self.changeFlow(scene.id);
// //   }, 1000);
// //
// // });
