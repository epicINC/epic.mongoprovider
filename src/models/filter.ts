

export enum OrderType {
    asc = 0,
    desc = 1
}

export type GeoPoint = {
    // 纬度
    lat: Number;

    // 经度
    lng: Number;
}

// for find etc...
// ref: https://loopback.io/doc/en/lb2/Querying-data.html
export type QueryFilter = {
	fields?: String | String[] | FieldsFilter;
	include?: String | String[] | IncludeFilter;
	limit?: Number;

	// { order: ['propertyName <ASC|DESC>', 'propertyName <ASC|DESC>',...] }
	order?: String | String[];
	// alias: offset
	skip?: Number;
	offset?: Number;


	where?: WhereFilter;

};

export type FieldsFilter = {
	[name: string]: Boolean;
};

export type IncludeFilter = {
	[name: string]: (IncludeFilter | String)[];
};

export type OrderFilter = {
    [name: string]: Number | String | OrderType
};


// for update, delete, count
// ref: https://loopback.io/doc/en/lb2/Where-filter.html
export type WhereFilter = {
	[name: string]: any;

	// Operators
	$eq?:	any;
	$neq?:	any;
	$and?:	WhereFilter[];
	$or?:	WhereFilter[];
	$gt?:	Number | Date;
	$gte?:	Number | Date;
	$lt?:	Number | Date;
	$let?:	Number | Date;
	$between?:	any[];
	$in?:	any[];
	$nin?:	any[];
	$near?:	String | Number[] | GeoPoint;
	$like?:	any;
	$nlike:	any;
	$regexp: String | RegExp;
};

export default QueryFilter;