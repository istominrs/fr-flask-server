export interface Section {
	title: string
	links: SectionLink[]
}

export interface SectionLink {
	label: string
	href: string
}
