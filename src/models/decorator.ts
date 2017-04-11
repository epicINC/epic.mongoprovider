


export type Schema = {
	model: Object;
	id: string | symbol;
	collection: string;
};



export class Metadata {
	private static map = new WeakMap<Object, Partial<Schema>>();

	static set (target: Object, data: Partial<Schema>) {
		let result = Metadata.map.get(target);
		if (!result)
			Metadata.map.set(target, {model: target});
		Object.assign(result, data);
	}

	static get (constructor: Function) : Object {
		return Metadata.map.get(constructor.prototype);
	}
}

export function id (target: Object, propertyKey: string | symbol) : void {
	Metadata.set(target, {id: propertyKey});
}

export function collection (name: string) {
	return function (constructor: Function) : void {
		Metadata.set(constructor.prototype, {collection: name});
	};
}
