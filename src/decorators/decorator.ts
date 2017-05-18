import Metadata from './metadata';



export function id (target: Object, propertyKey: string | symbol) : void {
	Metadata.set(target, {id: propertyKey});
}



export function data () : Function
export function data (name: string) : Function
export function data (options: Partial<MethodOptions>) : Function
export function data (ctor: Function, name: string, descriptor: PropertyDescriptor) : void
export function data (...args: any[]) : void | Function {
	let type = typeof(args[0])
	if (type !== 'function') return inner
	inner(args[0], args[1], args[2])

	function inner (ctor: Function, name: string, descriptor: PropertyDescriptor) {
		switch (type) {
			case 'string':
				Metadata.method(ctor, name, { method: 'post', route: args[0] })
				break;
			case 'object':
				Metadata.method(ctor, name, { method: 'post', ...args[0] })
				break;
			default:
				Metadata.method(ctor, name, { method: 'post' })
				break;
		}
	}
}

export function db (name: string) {
	return function (constructor: Function) : void {
		Metadata.set(constructor.prototype, {dataSource: name});
	};
}

