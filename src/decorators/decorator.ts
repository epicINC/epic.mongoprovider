import Metadata from './metadata'
import { CollectionOptions, FieldOptions } from './options'
// http://www.52chloe.com/Wiki/Document/3324793835434803200

export type classDecorator = (ctor: Function) => Function

/* tslint:disable:class-name */
export class data {


	static collection () : Function
	static collection (name: string) : Function
	static collection (options: Partial<CollectionOptions>) : Function
	static collection <T extends Function>(ctor: T) : void | T
	static collection (args?: any) : void | Function {
		let type = typeof(args)
		if (type !== 'function') return inner
		inner(args)

		function inner<T extends Function>(ctor: T) : void | T {

			switch (type) {
				case 'string':
					Metadata.class(ctor, { name: args })
					break;
				case 'object':
					Metadata.class(ctor, { ...args })
					break;
				default:
					Metadata.class(ctor)
					break;
			}
		}
	}
u
	static id () : Function
	static id (route: string) : Function
	static id (options: Partial<FieldOptions>) : Function
	static id (target: Object, name: string | symbol) : void
	static id (...args: any[]) : void | Function {
		console.log(args.length)
		let type = typeof(args[0])
		if (args.length === 3 && args[2] === undefined) return inner(args[0], args[1])
		return inner

		function inner(target: Object, name: string | symbol) : void {
			switch (type) {
				case 'string':
					Metadata.field(target.constructor, name, { name: args[0], primary: true })
					break;
				case 'object':
					Metadata.field(target.constructor, name, { primary: true, ...args[0] })
					break;
				default:
					Metadata.field(target.constructor, name, { primary: true })
					break;
			}
		}
	}

	static field () : Function
	static field (options: Partial<FieldOptions>) : Function
	static field (target: Object, name: string | symbol) : void
	static field (...args: any[]) : void | Function {
		let type = typeof(args[0])
		if (type !== 'function') return inner
		inner(args[0], args[1])

		function inner (ctor: Function, name: string) {
			switch (type) {
				case 'string':
					Metadata.field(ctor, name, { name: args[0], })
					break;
				case 'object':
					Metadata.field(ctor, name, { ...args[0] })
					break;
				default:
					Metadata.field(ctor, name)
					break;
			}
		}
	}

}
/*


declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;


class factory {

	static factory (...args: any[]) {
		switch (args.length) {
			case 1:
				return this.class(args[0]);
			case 2:
				return this.property(args[0], args[1]);
			case 3:
				if (typeof args[2] === 'number') return this.parameter(args[0], args[1], args[2]);
				return this.method(args[0], args[1], args[2]);
			default:
				throw new Error('unsupport type');
		}
	}

	static class <T extends Function>(ctor: T) {

	}

	static method <T extends Function>(ctor: T, key: string | symbol, descriptor: TypedPropertyDescriptor<T>) : TypedPropertyDescriptor<T> | void {

	}

	static parameter <T extends Function>(ctor: T, key: string | symbol, index: number) {

	}

	static property <T extends Function>(ctor: T, key: string | symbol) {

	}

}

*/