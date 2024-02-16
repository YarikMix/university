export interface Spare {
	id: number,
	name: string,
	description: string,
	image: string,
	status: number,
	price: number,
	weight: number,
	condition: number,
	rating: number
}

export interface Option {
	id: number,
	name: string
}

export interface DropdownMenuList {
	options: Option[],
	selectedOption: number,
	setSelectedOption: (id: number) => void,
	[placeholder: string]: string,
	[width: number]: number
}