
export type Schema = CollectionOption & {
	columns: {[field: string]: ColumnOption}
}


export type CollectionOption = {
	name: string
	collection: string
	connectionStrings: string
	map: string
}
// Schema
export type ColumnOption = {
	name: string
	autoIncrement: boolean
	primary: boolean
	unique: boolean
	fulltext: boolean
	index: boolean
	ignore: boolean
}