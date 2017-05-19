import Metadata from './metadata'
import { CollectionOptions, FieldOptions } from './options'


export type classDecorator = (ctor: Function) => Function

/* tslint:disable:class-name */
export class data {


	static collection () : Function
	static collection (name: string) : Function
	static collection (options: Partial<CollectionOptions>) : Function
	static collection (ctor: Function) : void | Function
	static collection (args?: any) : void | Function {
		let type = typeof(args)
		if (type !== 'function') return inner
		inner(args)

		function inner(ctor: Function) {

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

	static id () : Function
	static id (route: string) : Function
	static id (options: Partial<FieldOptions>) : Function
	static id <T extends Function>(ctor: Function, name: string) : void | T
	static id (...args: any[]) : void | Function {
		let type = typeof(args[0])
		if (type !== 'function') return inner
		inner(args[0], args[1])

		function inner (ctor: Function, name: string) {
			switch (type) {
				case 'string':
					Metadata.field(ctor, name, { name: args[0], primary: true })
					break;
				case 'object':
					Metadata.field(ctor, name, { primary: true, ...args[0] })
					break;
				default:
					Metadata.field(ctor, name, { primary: true })
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