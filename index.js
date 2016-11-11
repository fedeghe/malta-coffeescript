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
		oldname = o.name;

	return function (solve, reject){
		var ls = child_process.spawn('coffee', ['--compile', o.name]);
		
		ls.on('exit', function (code) {
			o.name = o.name.replace(/\.coffee$/, '.js');
			o.content = fs.readFileSync(o.name) + "";
			msg = 'plugin ' + path.basename(__filename) + ' wrote ' + o.name;
			fs.unlink(oldname);
			solve(o);
			self.notifyAndUnlock(start, msg);
		});

		ls.stdout.on('data', function(data) {
			self.log_debug(data + "");
		});

		ls.stderr.on('error', function (data) {
			self.log_err('stderr: ' + data);
		});
		ls.exit();
	};
}
malta_coffeescript.ext = 'coffee';
module.exports = malta_coffeescript;