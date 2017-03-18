
import * as mongodb from 'mongodb';
import * as filters from './models/filter';



export class Provder {

	collection: mongodb.Collection;
	options: Object;

	constructor(collection: mongodb.Collection, options: Object) {
		this.collection = collection;
		this.options = options;
	}

	get (query: Number | String | filters.QueryFilter) {
		if (typeof(query) !== 'object')
			
	}

	find (query: filters.QueryFilter) {

	}


	// create

	insert (data: any | any[]) {

	}

	upsert (where?: Number | String | filters.WhereFilter, data: any) {

	}

	// update
	update (where?: Number | String | filters.WhereFilter, data: any) {

	}

	// delete
	delete (where: Number | String | filters.WhereFilter) {

	}



	bulk (data: any[]) {

	}

};
