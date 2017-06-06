// https://github.com/pleerock/routing-controllers

const
	state = new Map<Function, Object>(),
	symbol = {
		column: Symbol.for('provider:field'),
		method: Symbol.for('provider:method'),
		collection: Symbol.for('provider:collection')
	}





export class Metadata {

	static get (key: string | symbol, target: Function | Object, propertyKey: string | symbol) : any {
		let result = state.get(target.constructor || (target as Function))
		return result[key] && (propertyKey && result[key][propertyKey])
	}

	static set (key: string | symbol, value: any, target: Function | Object, propertyKey: string | symbol) {
		let result = state.get(target.constructor || (target as Function))
		if (!result) state.set(target.constructor || (target as Function), result = {})
		if (!result[key]) result[key] = {}
		result[key][propertyKey] = value

	}

	static del (key: string | symbol, target: Function | Object, propertyKey: string | symbol) {

	}



}
export default Metadata