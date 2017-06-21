import { MongoTranslator } from './mongo'

export enum TranslatorType {
	Mongo = 1
}


export function create<T> (type: TranslatorType) {
	return new MongoTranslator<T>()
}