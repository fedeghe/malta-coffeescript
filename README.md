This plugin can be used on: **.coffee** files  

Sample usage:  
```
malta app/source/index.coffee public/js -plugins=malta-coffeescript
```
or in the .json file :
```
"app/source/index.coffee" : "public/js -plugins=malta-coffeescript"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.coffee',
    'public/js',
    '-plugins=malta-coffeescript',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```