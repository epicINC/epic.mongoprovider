const log4js = require('log4js');


log4js.configure({
	appenders: [
		{type: 'file', category: 'provider', filename: 'logs/provider.log'},
		{type: 'file', category: 'cursor', filename: 'logs/cursor.log'}
	]


});


class Logger {

	static getLogger (name) {
		return log4js.getLogger(name);
	}
}




module.exports = Logger.getLogger;
