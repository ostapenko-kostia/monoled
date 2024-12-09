"use client"

import { MenuIcon } from "lucide-react";

export function MenuButton() {
	return (
		<button onClick={() => alert('Open Menu')}>
			<MenuIcon size={40} strokeWidth={1.5} />
		</button>
	)
}
