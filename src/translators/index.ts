export * from './mongo'
export { ITranslator, IFilter } from '../types'


export enum TranslatorType {
	Mongo = 1
}


export function create<T> (type: TranslatorType) {
	return new MongoTranslator<T>()
}