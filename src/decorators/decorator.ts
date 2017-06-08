import Metadata from './metadata'
import { CollectionOption, ColumnOption } from './options'
// http://www.52chloe.com/Wiki/Document/3324793835434803200

export type classDecorator = (ctor: Function) => Function

/* tslint:disable:class-name */
export class schema {


	static collection () : Function
	static collection (name: string) : Function
	static collection (options: Partial<CollectionOption>) : Function
	static collection <T extends Function>(ctor: T) : void | T
	static collection (args?: any) : void | Function {
		let type = typeof(args)
		if (type !== 'function') return inner
		inner(args)

		function inner<T extends Function>(ctor: T) : void | T {

			switch (type) {
				case 'string':
					Metadata.collection(ctor, { name: args })
					break;
				case 'object':
					Metadata.collection(ctor, { ...args })
					break;
				default:
					// Metadata.collection(ctor)
					break;
			}
		}
	}

	static id () : Function
	static id (route: string) : Function
	static id (options: Partial<ColumnOption>) : Function
	static id (target: Object, name: PropertyKey) : void
	static id (...args: any[]) : void | Function {
		console.log(args.length)
		let type = typeof(args[0])
		if (args.length === 3 && args[2] === undefined) return inner(args[0], args[1])
		return inner

		function inner(target: Object, name: PropertyKey) : void {
			switch (type) {
				case 'string':
					Metadata.column(target.constructor, name, { name: args[0], primary: true })
					break;
				case 'object':
					Metadata.column(target.constructor, name, { primary: true, ...args[0] })
					break;
				default:
					Metadata.column(target.constructor, name, { primary: true })
					break;
			}
		}
	}

	static column () : Function
	static column (options: Partial<ColumnOption>) : Function
	static column (target: Object, name: PropertyKey) : void
	static column (...args: any[]) : void | Function {
		let type = typeof(args[0])
		if (type !== 'function') return inner
		inner(args[0], args[1])

		function inner (ctor: Function, name: string) {
			switch (type) {
				case 'string':
					Metadata.column(ctor, name, { name: args[0], })
					break;
				case 'object':
					Metadata.column(ctor, name, { ...args[0] })
					break;
				default:
					// Metadata.column(ctor, name)
					break;
			}
		}
	}

}
/*


declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: PropertyKey) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: PropertyKey, parameterIndex: number) => void;


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

	static method <T extends Function>(ctor: T, key: PropertyKey, descriptor: TypedPropertyDescriptor<T>) : TypedPropertyDescriptor<T> | void {

	}

	static parameter <T extends Function>(ctor: T, key: PropertyKey, index: number) {

	}

	static property <T extends Function>(ctor: T, key: PropertyKey) {

	}

}

*/