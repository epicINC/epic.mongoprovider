import * as mongodb from '@types/mongodb'
import * as filter from '../models/filter'

export interface IProviderConstructor<T> {
	new () : IProvider<T>
}

export interface IProvider<T> {
	get (query: filter.Query<T> | filter.Where<T>) : Promise<T>
	find (query: filter.Query<T> | filter.Where<T>) : Promise<mongodb.Cursor<T>>
	query (query: filter.Query<T> | filter.Where<T>) : Promise<T[]>
	insert (data: T | T[]) : Promise<mongodb.InsertOneWriteOpResult>
	updateOne (where: filter.Where<T>, data: T) : Promise<mongodb.UpdateWriteOpResult>
	upsertMany (where: filter.Where<T>, data: T) : Promise<mongodb.UpdateWriteOpResult>
	deleteOne (where: filter.Where<T>) : Promise<mongodb.DeleteWriteOpResultObject>
	deleteMany (where: filter.Where<T>) : Promise<mongodb.DeleteWriteOpResultObject>
	bulk (data: any[]) : Promise<mongodb.BulkWriteOpResultObject>
	count (query: filter.Query<T> | filter.Where<T>) : Promise<number>
}

export default IProvider