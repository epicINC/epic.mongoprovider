// https://github.com/pleerock/routing-controllers

const
	state = new Map<Function, Object>(),
	symbols = {
		column: Symbol.for('provider:field'),
		method: Symbol.for('provider:method'),
		collection: Symbol.for('provider:collection')
	}





export class Metadata {

	static get (key: PropertyKey, target: Function | Object, propertyKey?: PropertyKey) : any {
		let result = state.get(target.constructor || <Function>target)
		return result && result[key] && (propertyKey && result[key][propertyKey])
	}

	static set (key: PropertyKey, value: any, target: Function | Object, propertyKey: PropertyKey) {
		let result = state.get(target.constructor || <Function>target)
		if (!result) state.set(target.constructor || <Function>target, result = {})
		if (!result[key]) result[key] = {}
		result[key][propertyKey] = value
	}

	static addor

	static del (key: PropertyKey, target: Function | Object, propertyKey: PropertyKey) : boolean {
		let result = state.get(target.constructor || <Function>target)
		if (!result || !result[key]) return false
		if (propertyKey)
			return Reflect.deleteProperty(result[key], propertyKey)
		else
			return Reflect.deleteProperty(result, key)
	}

	static column (ctor: Function, propertyKey: PropertyKey, options: Partial<ColumnOption>) {
		
	}
}






export default Metadata