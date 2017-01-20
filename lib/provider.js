const
	debug = require('debug')('epic.provider:provider'),
	Cursor = require('./cursor');

const cursorMethods = new Set(Cursor.methods);


class Provider {

	constructor(collection, connectionManager, options) {
		this.collection = collection;
		this.connectionManager = connectionManager;
		if (!options) return;
		options.init && options.init(this);
		
	}

	get (query, projection) {
		return this.collection.then(e => e.find(query, projection).limit(1).next());
	}

	query (query, options) {
		return this.collection.then(e => {
			let cursor = e.find(query);
			if (options) {
				for (let key in options) {
					if (!cursorMethods.has(key)) continue;
					cursor[key](options[key]);
				}
			}
			return cursor.toArray();
		});
	}

	exists (query) {
		return this.collection.then(e => e.find(query).limit(1).hasNext());
	}


}

const methods = [
	'aggregate',
	'bulkWrite',
	'count',
	'createIndex',
	'createIndexes',
	'deleteMany',
	'deleteOne',
	'distinct',
	'drop',
	'dropIndex',
	'dropIndexes',
	'find',
	'findOneAndDelete',
	'findOneAndReplace',
	'findOneAndUpdate',
	'geoHaystackSearch',
	'geoNear',
	'group',
	'indexes',
	'indexExists',
	'indexInformation',
	'initializeOrderedBulkOp',
	'initializeUnorderedBulkOp',
	'insertMany',
	'insertOne',
	'isCapped',
	'listIndexes',
	'mapReduce',
	'options',
	'parallelCollectionScan',
	'reIndex',
	'rename',
	'replaceOne',
	'stats',
	'updateMany',
	'updateOne',
];


methods.forEach(method => {
	if (method === 'find') {
		Provider.prototype[method] = function (...args) {
			debug(method, ...args);
			return new Cursor(this.collection.then(e => e[method](...args)));
		};
	} else
		Provider.prototype[method] = function (...args) {
			debug(method, ...args);
			return this.collection.then(e => e[method](...args));
		};
});

module.exports = Provider;
module.methods = methods.concat('get', 'query');