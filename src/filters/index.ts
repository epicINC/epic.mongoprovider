import * as mongo from 'mongodb'


export enum OrderType {
    asc = 0,
    desc = 1
}

export type GeoPoint = {
    // 纬度
    lat: number

    // 经度
    lng: number
}

export type TopOperator<T = object> = {
	$and:	(TopOperator<T> | Partial<T> | { [P in keyof T]?: Partial<FieldOperator<T[P]>> })[]
	$or:	(TopOperator<T> | Partial<T> | { [P in keyof T]?: Partial<FieldOperator<T[P]>> })[]
}

export type FieldOperator<V = object> = {
	$eq:	V
	$neq:	V
	$gt:	V
	$gte:	V
	$lt:	V
	$let:	V
	$between:	[V, V]
	$in:	V[]
	$nin:	V[]
	$like:	V
	$nlike:	V
	$near:	string | number[] | GeoPoint
	$regexp: string | RegExp
}

// for update, delete, count
// ref: https://loopback.io/doc/en/lb2/Where-filter.html
export type Where<T = object> =  Partial<T> | { [P in keyof T]?: Partial<FieldOperator<T[P]>> } | Partial<TopOperator<T>>
export type Option<T> = {
	fields: keyof T | (keyof T)[] | Partial<FieldFilter<T>>
	include: string | string[] | IncludeFilter
	limit: number

	// { order: ['propertyName <ASC|DESC>', 'propertyName <ASC|DESC>',...] }
	order: string | string[]
	skip: number
}


// for find etc...
// ref: https://loopback.io/doc/en/lb2/Querying-data.html
export type Query<T = object> = Partial<Option<T>> & {
	where?: Where<T>
}

export type FieldFilter<T> = {
	[P in keyof T]: boolean
}

export type IncludeFilter = {
	[name: string]: (string | IncludeFilter)[];
}

export type OrderFilter<T> = {
    [P in keyof T]: OrderType
}

export const options = new Set(['fields', 'include', 'limit', 'order', 'sort', 'skip', 'offset'])



export class Options {

	static FindOneOptions = ['fields', 'limit', 'order', 'skip']

	static findOne<T> (q: Query<T>) : mongo.FindOneOptions | undefined {
		if (!q) return undefined
		let result: mongo.FindOneOptions | undefined
		this.FindOneOptions.forEach(e => {
			if (!Reflect.has(q, e)) return
			result || (result = {})
			result[e === 'order' ? 'sort' : e] = q[e]
		})
		return result
	}


}



export default Query