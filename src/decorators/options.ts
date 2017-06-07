
export type CollectionOption = {
	name: string
	collection: string
	fields: { [key: string]: Partial<ColumnOption> }
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