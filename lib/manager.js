const
	debug = require('debug')('group.provider:manager'),
	connect = require('mongodb');

class ConnectionManager {

	constructor (options) {
		this.connectionStrings = options.connectionString || options;
	}

	get connection () {
		if (!this._connection) {
			debug('connect to %s', this.connectionStrings);
			this._connection = connect(this.connectionStrings);
		}
		return this._connection;
	}


}

module.exports = function (connectionStrings) {
	if (module.connections[connectionStrings]) return module.connections[connectionStrings];
	return module.connections[connectionStrings] = new ConnectionManager(connectionStrings);
};
module.connections = {};
module.Manager = ConnectionManager;