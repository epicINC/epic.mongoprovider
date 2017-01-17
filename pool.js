const
	assert = require('assert'),
	EventEmitter = require('events'),
	connect = require('mongodb'),
	debug = require('debug')('epic.provider:connection'),
	epic = require('epic.util'),
	create = Symbol('create'),
	dispatcher = Symbol('dispatcher');

class Pool extends EventEmitter {
	
	constructor (initializer) {
		super();
		this.cache = {};
		this.initializer = initializer;
		this.clients = new Queue();
	}


	en (key, value) {
		debug('en', key);
		(this.cache[key] || (this.cache[key] = new Queue())).en(value);
		this.emit('en', {key, value});
	}

	de (key) {
		debug('de', key);
		return this[dispatcher](key, this.cache[key]);
	}


	[create] (key) {
		assert(this.initializer[key], 'initializer not found.');
		debug('init', key);
		this.cache[key].en(this.initializer[key]());
	}


	[dispatcher] (key, queue) {
		if (!queue || queue.count === 0) {
			queue = this.cache[key] || (this.cache[key] = new Queue());
			this[create](key);
		}

		//return epic.with(queue.de(), value => this.emit('de', {key, value}));
		return epic.with(queue.peek(), value => this.emit('de', {key, value}));
	}



	static creator (options) {
		if (options.connectionStrings)
			return connect.bind(null, options.connectionStrings);

	}

	static initializer (datasources) {
		let result = {};
		for (let key in datasources) {
			if (datasources[key].connector === 'mongodb')
				result[key] = Pool.creator(datasources[key]);
		}
		return result;
	}


	static middleware (config) {
		debug('pool middleware init.');
		const pool = new Pool(Pool.initializer(config.dataSources));

		//let used = [];
		//pool.on('de', used.push);

		return async function PoolNext(context, next) {
			context.connectionManager = pool;
			context.connection = e => pool.de(e);

			next && await next();

			//if (used.length > 0) {
			//	used.forEach(item => pool.en(item.key, item.value));
		//		used.length = 0;
			//	debug('Release one connections: %d', used.length);
			//}

		}

	}

}

module.exports = Pool.middleware;
