
export type GeoPoint = {
    // 纬度
    lat: Number;

    // 经度
    lng: Number;
};


type TopOperator<T> = {
	$and:	{[P in keyof T]?: T[P] | {[O in keyof FieldOperator<T[P]>]?: FieldOperator<T[P]>[O]}[]};
	$or:	{[P in keyof T]?: T[P] | {[O in keyof FieldOperator<T[P]>]?: FieldOperator<T[P]>[O]}[]};
};

type FieldOperator<V> = {
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

//type propertyOf<T = Object> = {[P in keyof T]?: T[P]};

type Where<T = Object> = {
	[P in keyof T]?:  Partial<FieldOperator<T[P]>>;
};

Pick
/*
 | {
	[P in keyof TopOperator<T>]?: TopOperator<T>[P];
}
*/
type User = {
	id: string;
	name: string;
	set: {a: number};
}

let b : Where<User> = {id: 1};

console.log(b);