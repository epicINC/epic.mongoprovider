import { ITranslator, IFilter } from '../types'


export class MongoTranslator<T extends object> implements ITranslator<T> {

	filter: MongoFilter<T>

	constructor (type: T) {
		this.filter = new MongoFilter<T>(type)
	}

	update (value: T) : object {
		return Util.flat(value)
	}
}

class Util {

	static toString = Object.prototype.toString

	static getType (value: any) : string {
		return Util.toString.call(value)
	}

	static isObject (value: any) : boolean {
		return Util.isObjectString(Util.getType(value))
	}

	private static isObjectString (type: string) : boolean {
		return type === '[object Object]' || type === '[object Array]'
	}

	static flat (value: object) : object {
		let result = {}, delimiter = '.',
		each = (o: object, path: string[]) => {
			let item: any
			Object.keys(o).forEach(e => {
				item = o[e]
				if (Util.isObject(item)) return each(item, path.concat(e))
				result[path.join(delimiter)] = value
			})
		}
		each(value, [])
		return result
	}
}


export class MongoFilter<T> implements IFilter<T> {

	type: T
	scheam: Scheam
	constructor (type: T) {
		this.type = type
		this.scheam = Scheam.get(type)
	}

	hasID (value: any) {
		return Reflect.has(value, this.scheam.id.name)
	}

	ID (value: T) : object {
		return {}
	}
}