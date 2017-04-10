
import * as mongodb from '@types/mongodb';
import * as filter from './models/filter';
import epic = require('epic.util');



class Util {
	static cursor<T> (cursor: mongodb.Cursor<T>, options: filter.Option) {
		if (options)
			Object.entries(options).forEach(([key, val]: [string, any]) => {
				if (!filter.options.has(key)) return;
				if (key === 'order') key = 'sort';
				if (key === 'fields') key = 'project';
				cursor[key](val);
			});
		return cursor;
	}
}


export default class BaseProvder {

	collection: mongodb.Collection;
	options: Object;

	constructor(collection: mongodb.Collection | Promise<mongodb.Collection> | (() => Promise<mongodb.Collection>), options?: Object) {
		if (typeof(collection) === 'function')
			this.init = async () => {
				this.collection = await collection();
				this.init = null;
				return this.collection;
			};
		else if (collection instanceof Promise) {
			this.init = async () => {
				this.collection = await collection;
				this.init = null;
				return this.collection;
			};
		} else
			this.collection = collection;
		this.options = options;
	}

	init: Action0;

	async get (query: filter.Query | filter.Where) {
		this.init && (await this.init());
		if (query.hasOwnProperty('where'))
			return this.collection.findOne(query, filter.Options(query));
		else
			return this.collection.findOne(query);
	}

	async find (query: filter.Query | filter.Where) {
		this.init && (await this.init());
		if (query.hasOwnProperty('where'))
			return Util.cursor(this.collection.find((<filter.Query>query).where), query);

		return this.collection.find(query);
	}

	async query (query: filter.Query | filter.Where) {
		return (await this.find(query)).toArray();
	}

	// create
	async insert (data: Object | Object[]) {
		this.init && (await this.init());
		return Array.isArray(data) ? this.collection.insertMany(data) : this.collection.insertOne(data);
	}

	async upsertOne (where: filter.Where, data: any) {
		this.init && (await this.init());
		return this.collection.updateOne(where, data, {upsert: true});
	}

	async upsertMany (where: filter.Where, data: any) {
		this.init && (await this.init());
		return this.collection.updateMany(where, data, {upsert: true, });
	}

	// update
	async updateOne (where: filter.Where, data: any) {
		this.init && (await this.init());
		return this.collection.updateOne(where, data);
	}

	async updateMany (where: filter.Where, data: any) {
		this.init && (await this.init());
		return this.collection.updateMany(where, data);
	}

	// delete
	async deleteOne (where: filter.Where) {
		this.init && (await this.init());
		return this.collection.deleteOne(where);
	}

	async deleteMany (where: filter.Where) {
		this.init && (await this.init());
		return this.collection.deleteMany(where);
	}



	async bulk (data: any[]) {
		this.init && (await this.init());
		return this.collection.bulkWrite(data);
	}

}