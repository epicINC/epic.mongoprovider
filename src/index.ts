
import * as mongodb from '@types/mongodb';
import * as filters from './models/filter';
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

	async get (where: filters.Where) {
		this.init && (await this.init());
		return this.collection.findOne(where);
	}

	async find (query: filters.Query) {
		this.init && (await this.init());
		return this.collection.find(query, filters.Options(query));
	}


	// create
	async insert (data: object | object[]) {
		this.init && (await this.init());
		return Array.isArray(data) ? this.collection.insertMany(data) : this.collection.insertOne(data);
	}

	async upsert (where?: filters.Where, data: any) {
		this.init && (await this.init());
		
	}

	// update
	async update (where?: filters.Where, data: any) {
		this.init && (await this.init());
	}

	// delete
	async delete (where: filters.Where) {
		this.init && (await this.init());
	}



	async bulk (data: any[]) {
		this.init && (await this.init());
	}

};
