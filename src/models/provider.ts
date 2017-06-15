import * as mongodb from 'mongodb'
import * as filter from '../filters'
import IProvider from './iprovider'
import * as epic from 'epic.util'

class Util {
	static cursor<T> (cursor: mongodb.Cursor<T>, options: object) {
		if (options)
			Object.entries(options).forEach(([key, val]: [string, any]) => {
				if (!filter.options.has(key)) return
				if (key === 'order') key = 'sort'
				if (key === 'fields') key = 'project'
				cursor[key](val)
			})
		return cursor
	}
}

function isQuery <T>(q: filter.Query<T> | filter.Where<T>) : q is filter.Query<T> {
	return Reflect.has(q, 'where')
}



export default class Provider<T = object> implements IProvider<T> {

	promise: Promise<mongodb.Collection>
	options: object | undefined

	constructor (collection: mongodb.Collection)
	constructor (collection: Promise<mongodb.Collection>)
	constructor (collection: Func0<Promise<mongodb.Collection>>)
	constructor (collection: mongodb.Collection | Promise<mongodb.Collection> | Func0<Promise<mongodb.Collection>>, options?: object) {
		if (typeof(collection) === 'function')
			this.promise = collection()
		else if (collection instanceof Promise)
			this.promise = collection
		else if ((collection as object).constructor.name === 'Collection')
			this.promise = Promise.resolve(collection)
		else
			throw new TypeError(`unsupport type: ${(collection as object).constructor.name}`)
		this.options = options
	}

	get (query: filter.Query<T> | filter.Where<T>) {
		return this.promise.then(e => isQuery(query) ? e.findOne(query as Object, filter.Options.findOne<T>(query)) : e.findOne(query))
	}

	find (query: filter.Query<T> | filter.Where<T>) {
		return this.promise.then(e => query.hasOwnProperty('where') ? Util.cursor(e.find((query as filter.Query<T>).where as Object), query) : e.find(query))
	}

	query (query: filter.Query<T> | filter.Where<T>) {
		return this.find(query).then(e => e.toArray())
	}

	// create
	insert (data: T | T[]) {
		return this.promise.then<mongodb.InsertWriteOpResult | mongodb.InsertOneWriteOpResult>(e => Array.isArray(data) ? e.insertMany(data) : e.insertOne(data))
	}

	upsertOne (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateOne(<object>where, data, {upsert: true}))
	}

	upsertMany (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateMany(<object>where, data, {upsert: true}))
	}

	// update
	updateOne (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateOne(<object>where, data))
	}

	updateMany (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateMany(<object>where, data))
	}

	// delete
	deleteOne (where: filter.Where<T>) {
		return this.promise.then(e => e.deleteOne(<object>where))
	}

	deleteMany (where: filter.Where<T>) {
		return this.promise.then(e => e.deleteMany(<object>where))
	}

	bulk (data: any[]) {
		return this.promise.then(e => e.bulkWrite(data));
	}

	count (query: filter.Query<T> | filter.Where<T>) {
		return this.promise.then(e => e.count(<object>query))
	}
}