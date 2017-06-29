import * as mongodb from '@types/mongodb'
import * as filter from '../filters'
import IProvider from './iprovider'

import { MongoTranslator } from '../translators'
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
// 

export default class Provider<T extends object> implements IProvider<T> {

	promise: Promise<mongodb.Collection>
	options: object | undefined
	type: T
	translator: MongoTranslator<T>

	constructor (type: T, collection: mongodb.Collection)
	constructor (type: T, collection: Promise<mongodb.Collection>)
	constructor (type: T, collection: Func0<Promise<mongodb.Collection>>)
	constructor (type: T, collection: mongodb.Collection | Promise<mongodb.Collection> | Func0<Promise<mongodb.Collection>>, options?: object) {
		if (typeof(collection) === 'function')
			this.promise = collection()
		else if (collection instanceof Promise)
			this.promise = collection
		else if ((collection as object).constructor.name === 'Collection')
			this.promise = Promise.resolve(collection)
		else
			throw new TypeError(`unsupport type: ${(collection as object).constructor.name}`)
		this.options = options

		this.type = type
		this.translator = new MongoTranslator(type)
	}

	get (query: filter.Query<T> | filter.Where<T>) {
		if (isQuery<T>(query))
			return this.promise.then(e => e.findOne(query as Object, filter.Options.findOne<T>(query)))
		return this.promise.then(e => e.findOne<T>(query as Object))
	}

	find (query: filter.Query<T> | filter.Where<T>) {
		if (isQuery<T>(query))
			return this.promise.then(e => Util.cursor(e.find((query as filter.Query<T>).where as Object), query))
		return this.promise.then(e => e.find(query as Object))
	}

	query (query: filter.Query<T> | filter.Where<T>) {
		return this.find(query).then(e => e.toArray())
	}

	// create
	insert (data: T | T[]) {
		if (Array.isArray(data))
			return this.promise.then(e => e.insertMany(data))
		return this.promise.then(e => e.insertOne(data))
	}

	upsertOne (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateOne(<object>where, data, {upsert: true}))
	}

	upsertMany (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateMany(<object>where, data, {upsert: true}))
	}

	// update

	update (data: T | T[]) {
		if (Array.isArray(data))
			return this.bulk(data.map(e => ({ updateOne: { filter: this.translator.filter.ID(e), update: this.translator.update(e)} })))
		return this.updateOne(this.translator.filter.ID(data), data)
	}

	updateOne (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateOne(<object>where, data))
	}

	updateMany (where: filter.Where<T>, data: any) {
		return this.promise.then(e => e.updateMany(<object>where, data))
	}

	delete (value: any|any[]) {
			
	}

	// delete
	deleteOne (where: filter.Where<T>) {
		return this.promise.then(e => e.deleteOne(<object>where))
	}

	deleteMany (where: filter.Where<T>) {
		return this.promise.then(e => e.deleteMany(<object>where))
	}

	bulk (data: object[]) {
		return this.promise.then(e => e.bulkWrite(data))
	}

	count (query: filter.Query<T> | filter.Where<T>) {
		return this.promise.then(e => e.count(<object>query))
	}
}