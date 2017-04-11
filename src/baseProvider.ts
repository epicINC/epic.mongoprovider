
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


export interface IProvder<T> {
	get (query: filter.Query | filter.Where) : Promise<T>;
	find (query: filter.Query | filter.Where) : Promise<mongodb.Cursor<T>>;
	query (query: filter.Query | filter.Where) : Promise<T[]>;
	insert (data: T | T[]) : Promise<mongodb.InsertOneWriteOpResult>;
	updateOne (where: filter.Where, data: T) : Promise<mongodb.UpdateWriteOpResult>;
	upsertMany (where: filter.Where, data: T) : Promise<mongodb.UpdateWriteOpResult>;
	deleteOne (where: filter.Where) : Promise<mongodb.DeleteWriteOpResultObject>;
	deleteMany (where: filter.Where) : Promise<mongodb.DeleteWriteOpResultObject>;
	bulk (data: any[]) : Promise<mongodb.BulkWriteOpResultObject>;
	count (query: filter.Query | filter.Where) : Promise<number>;
}


export default class BaseProvder implements IProvder<any> {

	promise: Promise<mongodb.Collection>;
	options: Object;

	constructor(collection: mongodb.Collection)
	constructor(collection: Promise<mongodb.Collection>)
	constructor(collection: Func0<Promise<mongodb.Collection>>)
	constructor(collection: mongodb.Collection | Promise<mongodb.Collection> | Func0<Promise<mongodb.Collection>>, options?: Object) {
		if (typeof(collection) === 'function')
			this.promise = collection();
		else if (collection instanceof Promise)
			this.promise = collection;
		else if ((collection as Object).constructor.name === 'Collection')
			this.promise = Promise.resolve(collection);
		else
			throw new TypeError(`unsupport type: ${(collection as Object).constructor.name}`);
		this.options = options;
	}

	get (query: filter.Query | filter.Where) {
		return this.promise.then(e => query.hasOwnProperty('where') ? e.findOne(query, filter.Options(query)) : e.findOne(query));
	}

	find (query: filter.Query | filter.Where) {
		return this.promise.then(e => query.hasOwnProperty('where') ? Util.cursor(e.find((<filter.Query>query).where), query) : e.find(query));
	}

	query (query: filter.Query | filter.Where) {
		return this.find(query).then(e => e.toArray());
	}

	// create
	insert (data: Object | Object[]) {
		return this.promise.then<mongodb.InsertWriteOpResult | mongodb.InsertOneWriteOpResult>(e => Array.isArray(data) ? e.insertMany(data) : e.insertOne(data));
	}

	upsertOne (where: filter.Where, data: any) {
		return this.promise.then(e => e.updateOne(where, data, {upsert: true}));
	}

	upsertMany (where: filter.Where, data: any) {
		return this.promise.then(e => e.updateMany(where, data, {upsert: true}));
	}

	// update
	updateOne (where: filter.Where, data: any) {
		return this.promise.then(e => e.updateOne(where, data));
	}

	updateMany (where: filter.Where, data: any) {
		return this.promise.then(e => e.updateMany(where, data));
	}

	// delete
	deleteOne (where: filter.Where) {
		return this.promise.then(e => e.deleteOne(where));
	}

	deleteMany (where: filter.Where) {
		return this.promise.then(e => e.deleteMany(where));
	}

	bulk (data: any[]) {
		return this.promise.then(e => e.bulkWrite(data));
	}

	count (query: filter.Query | filter.Where) {
		return this.promise.then(e => e.count(query));
	}
}