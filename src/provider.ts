import * as mongodb from '@types/mongodb';
import baseProvider from './baseProvider';


class Provider<T> {
	type: T;
	constructor (type: T) {
		this.type = type;
	}

	get (id: number | string);
	get ()

}


