# Node RED

**Note**: *because NR Scenes is more than just a set of custom nodes (it requires a
custom storage implementation) it cannot be started from the command line using
the default `bin` script, but instead needs to be called via the `start` method.
I have opted not to include Node RED in the module, instead it must be injected.
This improves flexibility when integrating with an existing applications.*

## Basic Use

```js
var RED = require('node-red');
var nrScenes = require('node-red-contrib-scenes');
nrScenes.start(RED, {port:1880});
```

[See this page](modules/startermodule.html#start) for more information on available
parameters and options.

## Extended Use

TBD
