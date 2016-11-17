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
		pluginName = path.basename(path.dirname(__filename)),
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};

	return function (solve, reject){
		try {
			var ls = child_process.spawn('coffee', ['--compile', o.name]);
			ls.on('exit', function (code) {
				o.name = o.name.replace(/\.coffee$/, '.js');
				o.content = fs.readFileSync(o.name) + "";
				msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name;
				fs.unlink(oldname);
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
			doErr(err);
		}
	};
}
malta_coffeescript.ext = 'coffee';
module.exports = malta_coffeescript;