require('malta').checkExec('coffee');
//
// To use this plugin you need
//
// npm install -g coffee-script
//
var path = require('path'),
    fs = require('fs'),
    child_process = require('child_process');

function malta_coffeescript(o, options) {

    var self = this,
        start = new Date(),
        msg,
        dir = path.dirname(o.name),
        oldname = o.name,
        pluginName = path.basename(path.dirname(__filename));

    return function (solve, reject) {
        try {
            var ls = child_process.spawn('coffee', ['--compile', o.name]);
            ls.on('exit', function (code) {
                o.name = o.name.replace(/\.coffee$/, '.js');
                o.content = fs.readFileSync(o.name) + "";
                msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name;
                fs.unlink(oldname, () => { });
                solve(o);
                self.notifyAndUnlock(start, msg);
            });
        } catch (err) {
            reject(`Plugin ${pluginName} compilation error:\n${err}`);
            self.doErr(err, o, pluginName);
        }
    };
}
malta_coffeescript.ext = 'coffee';
module.exports = malta_coffeescript;