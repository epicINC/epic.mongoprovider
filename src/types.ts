

declare global {

}

export default {}



export interface ITranslator<T> {
	filter: IFilter<T>
	update (value: T) : object
}

export interface IFilter<T> {
	ID () : object
}