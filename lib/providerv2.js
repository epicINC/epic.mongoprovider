const
	assert = require('assert'),
	EventEmitter = require('events'),
	debug = require('debug')('group.provider:provider');

const
	options = {
		upsert: {upsert: true}
	}

class Analyzer {

	constructor(schema) {
		this.schema = schema;
	}

	id (filter) {
		assert.ok(filter, 'need filter')
		assert.ok(filter.hasOwnProperty(this.schema.id), 'need id')

		return {[this.schema.idInjection ? '_id' : this.schema.id]: filter[this.schema.id]};
	}

	update (data) {
		let result = {}, set;
		Object.keys(this.schema.properties).forEach(e => {
			if (!data.hasOwnProperty(e)) return;
			set = this.schema.properties[e];
			if (!set.isArray) {

			} else if (set.type !== 'object') {

			} else {
				result[e] = data[e];
			}
		});
	}

}


class Provider extends EventEmitter
{
	constructor (schema, collection) {
		super()
		this.analyzer = typeof schema !== 'Analyzer' ? new Analyzer(schema) : schema;
		this.collection = collection;

	}

	create (data) {
		return this.collection.insert(data);
	}


	/**
	 * 更新或插入
	 *
	 * @param      {<type>}  data    The data
	 * @return     {Object}  
	 * update { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
	 * insert { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0, "upsertedId" : ObjectId("576b6c29383b2be37b913c48") }
	 */
	upsert (data) {
		return this.collection.updateOne(this.analyzer.id(filter), data, options.upsert);
	}


}


module.exports = Provider;
