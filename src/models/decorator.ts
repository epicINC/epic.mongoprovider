import Metadata from './metadata';



export function id (target: Object, propertyKey: string | symbol) : void {
	Metadata.set(target, {id: propertyKey});
}

export function collection (name: string) {
	return function (constructor: Function) : void {
		Metadata.set(constructor.prototype, {collection: name});
	};
}


export function db (name: string) {
	return function (constructor: Function) : void {
		Metadata.set(constructor.prototype, {dataSource: name});
	};
}
