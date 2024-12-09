"use client"

import { SearchIcon } from "lucide-react";

export function SearchButton() {
	return (
		<button onClick={() => alert('Open Search')}>
			<SearchIcon size={30} strokeWidth={1.5} />
		</button>
	)
}
