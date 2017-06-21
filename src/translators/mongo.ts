export class MongoTranslator<T> {

	filter: MongoFilter<T>

	constructor () {
		this.filter = new MongoFilter<T>()
	}
}

export class MongoFilter<T> {

	constructor () {
	}

	ID () : object {
		return {}
	}
}