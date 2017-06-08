// https://github.com/pleerock/routing-controllers
import { CollectionOption, ColumnOption } from './options'

const
	state = new Map<Function, Object>(),
	symbols = {
		column: Symbol.for('schema:field'),
		method: Symbol.for('schema:method'),
		collection: Symbol.for('schema:collection'),
		parameter: Symbol.for('schema:parameter')
	}





export class Metadata {

	static get (key: PropertyKey, target: Function | Object, propertyKey?: PropertyKey) : any {
		let result = state.get(target.constructor || <Function>target)
		return result && result[key] && (propertyKey && result[key][propertyKey])
	}

	static set (key: PropertyKey, value: any, target: Function | Object, propertyKey?: PropertyKey) {
		let result = state.get(target.constructor || <Function>target)
		if (!result) state.set(target.constructor || <Function>target, result = {})

		if (propertyKey) {
			let set = result[key] || (result[key] = {})
			if (set[propertyKey])
				Object.assign(set[propertyKey], value)
			else
				set[propertyKey] = value
			return
		}

		if (result[key])
			Object.assign(result[key], value)
		else
			result[key] = value || {}
	}

	static del (key: PropertyKey, target: Function | Object, propertyKey: PropertyKey) : boolean {
		let result = state.get(target.constructor || <Function>target)
		if (!result || !result[key]) return false
		if (propertyKey)
			return Reflect.deleteProperty(result[key], propertyKey)
		else
			return Reflect.deleteProperty(result, key)
	}


	static collection (ctor: Function, options: Partial<CollectionOption>) {
		this.set(symbols.collection, options, ctor)
	}

	static column (ctor: Function, propertyKey: PropertyKey, options: Partial<ColumnOption>) {
		this.set(symbols.column, options, ctor, propertyKey)
	}
}






export default Metadata