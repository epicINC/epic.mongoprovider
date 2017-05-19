import { CollectionOptions, FieldOptions } from './options'

export class Metadata {

	static map = new Map<Function, Partial<CollectionOptions>>()

	static class (ctor: Function, options?: Partial<CollectionOptions>) : Partial<CollectionOptions> {
		let result = this.map.get(ctor)
		if (!result) this.map.set(ctor, result = {name: ctor.name })
		if (options) Object.assign(result, options)
		return result;
	}

	static field (ctor: Function, name: string, options?: Partial<FieldOptions>) {
		let result = this.class(ctor)
		result.fields || (result.fields = {})
		let property = result.fields[name] || (result.fields[name] = { })
		if (options) Object.assign(property, options)
		return property
	}

}

export default Metadata