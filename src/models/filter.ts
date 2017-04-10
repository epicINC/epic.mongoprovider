

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



// for update, delete, count
// ref: https://loopback.io/doc/en/lb2/Where-filter.html
export type Where = {
	[name: string]: any;

	// Operators
	$eq?:	any;
	$neq?:	any;
	$and?:	Where[];
	$or?:	Where[];
	$gt?:	Number | Date;
	$gte?:	Number | Date;
	$lt?:	Number | Date;
	$let?:	Number | Date;
	$between?:	any[];
	$in?:	any[];
	$nin?:	any[];
	$near?:	String | Number[] | GeoPoint;
	$like?:	any;
	$nlike?:	any;
	$regexp?: String | RegExp;

	/*

	$where: String | () => Boolean;
	*/
};


export type Option = {
	fields?: String | String[] | Fields;
	include?: String | String[] | Include;
	limit?: Number;

	// { order: ['propertyName <ASC|DESC>', 'propertyName <ASC|DESC>',...] }
	order?: String | String[];
	// alias: offset
	skip?: Number;
	offset?: Number;
};


// for find etc...
// ref: https://loopback.io/doc/en/lb2/Querying-data.html
export type Query = Option & {
	where?: Where;
};

export type Fields = {
	[name: string]: Boolean;
};

export type Include = {
	[name: string]: (Include | String)[];
};

export type Order = {
    [name: string]: Number | String | OrderType
};



//const options = new Set(['limit', 'sort', 'fields', 'skip', 'hint', 'explain', 'snapshot', 'timeout', 'tailable', 'batchSize', 'returnKey', 'maxScan', 'min', 'max', 'showDiskLoc', 'comment', 'raw', 'promoteLongs', 'promoteValues', 'promoteBuffers', 'readPreference', 'partial', 'maxTimeMS', 'collation']);


export const options = new Set(['fields', 'include', 'limit', 'order', 'sort', 'skip', 'offset']);

export function Options (data: Query) {
	if (!data) return data;
	let result: object;
	Object.keys(data).forEach(e => {
		if (!options.has(e)) return;
		!result && (result = {});
		result[e === 'order' ? 'sort' : e] = data[e];
		delete data[e];
	});
	return result;
}


export default Query;