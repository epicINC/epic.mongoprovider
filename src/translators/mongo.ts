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

	static flat (value: object) : object {
		let result = {}, delimiter = '.',
		each = (o: object, path: string[]) => {
			Object.keys(o).forEach(e => {
				let
					item = o[e],
					isObject = (type => type === '[object Object]' || type === '[object Array]')(Util.toString.call(item))
				if (isObject)
					return each(item, path.concat(e))
				result[path.join(delimiter)] = value
			})
		}
		each(value, [])
		return result
	}
}


export class MongoFilter<T> implements IFilter<T> {

	type: T
	constructor (type: T) {
		this.type = type
	}

	ID (value: T) : object {
		return {}
	}
}