
import * as mongodb from '@types/mongodb';
import * as filter from './models/filter';
import epic = require('epic.util');



export class Provder {

	collection: mongodb.Collection;
	options: Object;

	constructor(collection: mongodb.Collection | (() => Promise<mongodb.Collection>), options: Object) {
		if (typeof(collection) === 'function')
			this.init = async () => {
				this.collection = await collection();
				this.init = null;
				return this.collection;
			};
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
			return this.collection.find(query, filter.Options(query));
		else
			return this.collection.find(query);
	}

	async query (query: filter.Query | filter.Where) {
		
	}


	// create
	async insert (data: object | object[]) {
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

};
