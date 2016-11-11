const
	assert = require('assert'),
	debug = require('debug')('epic.provider:mutilProvider'),
	Provider = require('./provider');





let MutilProvider = function (config, connectionManager, options) {

	let selector = config.selector || (e => e),
		collection = config.collection || (e => e),
		dataSources = config.dataSources,
		providers = {};

	return data => {
		let key = selector(data);
		if (key === undefined || key === null || key === false)
			throw new Error('MutilProvider: key not found.');

		//if (providers[key]) return providers[key];
		assert.ok(dataSources[key], `${key} not in config.`);

		return providers[key] = new Provider(connectionManager.de(dataSources[key]).then(e => e.collection(collection(data))), connectionManager, options);
	};
};




module.exports = MutilProvider;