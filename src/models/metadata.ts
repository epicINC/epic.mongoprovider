
export type Schema = {
	model: Object;
	id: string | symbol;
	collection: string;
	dataSource: string;
};


export default class Metadata {
	private static map = new WeakMap<Object, Partial<Schema>>();

	static set (target: Object, data: Partial<Schema>) {
		let result = Metadata.map.get(target);
		if (!result)
			Metadata.map.set(target, {model: target});
		Object.assign(result, data);
	}

	static get (constructor: Function) : Partial<Schema> {
		return Metadata.map.get(constructor.prototype);
	}
}

