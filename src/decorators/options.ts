
export type CollectionOptions = {
	name: string
	collection: string
	fields: { [key: string]: Partial<FieldOptions> }
}

export type FieldOptions = {
	name: string
	primary: boolean
	unique: boolean
	fulltext: boolean
	index: boolean
}