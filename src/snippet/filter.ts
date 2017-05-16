
import * as filter from '../models/filter';

class User {

	id: string;
	as: number;
	ts: number;
	ver: number;
}

let top : Partial<filter.TopOperator<User>> = {
	$or: [{id: 'test', as: {$gt: 1}}],
	$and: [
		{$or: [{id: 'test', ts: {$gt: 2}}]},
		{$or: [{id: 'test', ts: {$gt: 2}}]}
	]

};

console.log(top);

let w : filter.Where<User> = {
	id: {$eq: 'test', $nin: ['d'], $neq: 1}
};

console.log(w);


let q : filter.Query<User> = {
	where: w,
	fields: ['as', 'ver']
};

console.log(q);

interface IUser {
	id: string;
	name: string;
	as: number;
	ts: number;
}

class User implements IUser {
	id: string;
	name: string;
	as: number;
	ts: number;
}

let user: IUser = {id: '', name: '', as: 0, ts: 0};

type getUser = (e: IUser) => number;
let getID : getUser = (e: IUser) => e.id;




