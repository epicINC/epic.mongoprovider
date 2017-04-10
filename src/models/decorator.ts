

const keys = {
  id: Symbol('id')
};


class Metadata {
	private map = new Map();

	private upsert (target: Object, set: Object) {
		let result = this.map.get(target);
		if (!result) {
			this.map.set(target, set);
		} else
			Object.assign(result, set);
	}

	get (constructor: Function) : Object {
		return this.map.get(constructor.prototype);
	}

	id (target: Object, field: string | symbol) {
		this.upsert(target, {id: field});
	}

	collection (target: Object, name: string) {
		this.upsert(target, {collection: name});
	}
}


export const metadata = new Metadata();

// 主键编号
export function id (target: Object, propertyKey: string | symbol) : void {
	metadata.id(target, propertyKey);
}

export function collection (name: string) {
	return function (constructor: Function) : void {
		metadata.collection(constructor.prototype, name);
	};
}


