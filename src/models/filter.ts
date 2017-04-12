

export enum OrderType {
    asc = 0,
    desc = 1
}

export type GeoPoint = {
    // 纬度
    lat: Number;

    // 经度
    lng: Number;
};

export type TopOperator<T = Object> = {
	$and:	(TopOperator<T> | Partial<T> | { [P in keyof T]?: Partial<FieldOperator<T[P]>> })[];
	$or:	(TopOperator<T> | Partial<T> | { [P in keyof T]?: Partial<FieldOperator<T[P]>> })[];
};

export type FieldOperator<V = Object> = {
	$eq:	V;
	$neq:	V;
	$gt:	V;
	$gte:	V;
	$lt:	V;
	$let:	V;
	$between:	[V, V];
	$in:	V[];
	$nin:	V[];
	$like:	V;
	$nlike:	V;
	$near:	String | Number[] | GeoPoint;
	$regexp: String | RegExp;
};

// for update, delete, count
// ref: https://loopback.io/doc/en/lb2/Where-filter.html
export type Where<T = Object> =  Partial<T> | { [P in keyof T]?: Partial<FieldOperator<T[P]>> } | Partial<TopOperator<T>>;

export type Option<T> = {
	fields: keyof T | (keyof T)[] | Partial<Fields<T>>;
	include: String | String[] | Include;
	limit: Number;

	// { order: ['propertyName <ASC|DESC>', 'propertyName <ASC|DESC>',...] }
	order: String | String[];
	// alias: offset
	skip: Number;
	offset: Number;
};


// for find etc...
// ref: https://loopback.io/doc/en/lb2/Querying-data.html
export type Query<T = Object> = Partial<Option<T>> & {
	where?: Where<T>;
};

export type Fields<T> = {
	[P in keyof T]: Boolean;
};

export type Include = {
	[name: string]: (Include | String)[];
};

export type Order<T> = {
    [P in keyof T]: Number | OrderType
};

export const options = new Set(['fields', 'include', 'limit', 'order', 'sort', 'skip', 'offset']);

export function Options (data: Query) {
	if (!data) return data;
	let result : object;
	Object.keys(data).forEach(e => {
		if (!options.has(e)) return;
		!result && (result = {});
		if (e === 'order')
			e = 'sort';
		else if (e === 'offset')
			e = 'skip';

		result[e] = data[e];
		delete data[e];
	});
	return result;
}


export default Query;