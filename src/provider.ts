import * as filter from './filters'
import * as mongo from 'mongodb'

export enum ActionResult {

	fail = 0,
	ok = 1 << 1,
	insert = 1 << 2,
	update = 1 << 3,
	remove = 1 << 4

}


type ProviderOption = {
	connectionStrings: string
	collection: string
}

class SchemaReader {
	connectionStrings: {[key: string]: string}
	schema: any
	options: Partial<ProviderOption>
	constructor (schema: any, options?: Partial<ProviderOption>) {
		this.schema = schema
		this.options = options
	}


	get connectionStrings () {
		return (this.options && this.options.connectionStrings) || this.schema.connectionStrings || (this.schema.map && this.connectionStrings[this.schema.map])
	}
}


export class Provider<T> {

	constructor (connectionStrings: string)
	constructor (options?: Partial<ProviderOption> | string) {
		if (typeof options === 'string') options = {connectionStrings: options}

		this.schema = null
		this.connection = mongo.MongoClient.connect()

	}

	private getConnectionStrrings (connectionStrings: string) : string {
		return connectionStrings || this.schema.connectionStrings || 
	} 

	get (q: filter.Where<T>) : T {

	}

	find (q: filter.Query<T>) : T[] {

	}

	update (value: T) : boolean {

	}

	upsert (value: T) : boolean {

	}

	remove () : boolean {

	}


}