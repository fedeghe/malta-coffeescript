---
[![npm version](https://badge.fury.io/js/malta-coffeescript.svg)](http://badge.fury.io/js/malta-coffeescript)
[![npm downloads](https://img.shields.io/npm/dt/malta-coffeescript.svg)](https://npmjs.org/package/malta-coffeescript)
[![npm downloads](https://img.shields.io/npm/dm/malta-coffeescript.svg)](https://npmjs.org/package/malta-coffeescript)  
---  

This plugin can be used on: **.coffee** files  
needs `coffee` to be available in the comend line.  

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