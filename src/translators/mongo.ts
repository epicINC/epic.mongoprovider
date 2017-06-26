export class MongoTranslator<T> {

	filter: MongoFilter<T>

	constructor (type: T) {
		this.filter = new MongoFilter<T>(type)
	}
}

export class MongoFilter<T> {

	type: T
	constructor (type: T) {
		this.type = type
	}

	ID () : object {
		return {}
	}
}