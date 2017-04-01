
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

	async get (query: filters.Where) {
		this.init && (await this.init());
		return this.collection.findOne(query, filters.Options(query));
	}

	find (query: filters.Query) {

	}


	// create

	insert (data: any | any[]) {

	}

	upsert (where?: Number | String | filters.Where, data: any) {

	}

	// update
	update (where?: Number | String | filters.Where, data: any) {

	}

	// delete
	delete (where: Number | String | filters.Where) {

	}



	bulk (data: any[]) {

	}

};
