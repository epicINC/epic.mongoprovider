export class SchemaReader<T> {

	static instance<T> () : SchemaReader<T> {
		return new SchemaReader<T>(e)
	}

	ID (data: T) : object {
		return {}
	}
}