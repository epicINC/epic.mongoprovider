export interface ITranslator<T> {
	filter: IFilter<T>
}

export interface IFilter<T> {
	ID () : object
}