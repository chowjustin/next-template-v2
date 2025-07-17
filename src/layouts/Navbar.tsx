"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import UnstyledLink from "@/components/links/UnstyledLink";
import NextImage from "@/components/NextImage";

const navLinks = [
	{ href: "/", label: "Beranda" },
	{ href: "/about", label: "Tentang Kami" },
	{ href: "/gallery", label: "Galeri" },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const isActive = useMemo(
		() => (href: string) => pathname === href,
		[pathname],
	);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<nav className="bg-white shadow-md w-full fixed z-50">
			<div className="px-4 sm:px-6 md:px-8 lg:px-[8%] mx-auto">
				<div className="flex items-center justify-between h-20 max-md:h-16">
					{/* Logo */}
					<UnstyledLink
						href={`/`}
						className="flex items-center gap-2 max-md:gap-1"
					>
						<NextImage
							width={552}
							height={388}
							src={"/next.svg"}
							alt="Logo"
							priority
							serverStaticImg
							className="flex max-w-[75px] items-center md:max-w-[100px]"
						/>
						<p className="text-xl max-md:text-base max-lg:hidden max-md:block text-gray-900 font-semibold">
							Next Template
						</p>
					</UnstyledLink>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						<div className="flex items-baseline space-x-6">
							{navLinks.map((link) => (
								<UnstyledLink
									href={link.href}
									key={link.href}
									className="group relative cursor-pointer"
								>
									<p
										className={`relative z-10 transition-all duration-300 ease-in-out ${
											isActive(link.href)
												? "text-gray-700 font-bold"
												: "hover:text-gray-700 text-gray-400"
										}`}
									>
										{link.label}
									</p>
									<span
										className={`absolute bottom-0 h-[1px] bg-gray-700 rounded-full transition-all duration-300 ease-in-out left-1/2 w-0 group-hover:w-full group-hover:left-0`}
									></span>
								</UnstyledLink>
							))}
						</div>
					</div>

					{/* Mobile Menu */}
					<div className="md:hidden">
						{/* Mobile Menu Button */}
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center cursor-pointer justify-center rounded-md pt-1 text-primary-500 hover:text-primary-600 focus:outline-none focus:ring-inset focus:ring-white transition-colors duration-200"
							aria-expanded={isOpen}
							aria-label="Toggle navigation menu"
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>

						{/* Mobile Menu Dropdown */}
						<div
							ref={dropdownRef}
							className={`absolute top-full left-0 right-0 md:hidden transition-all duration-500 ease-in-out ${
								isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
							} overflow-hidden bg-white border-t border-gray-200 shadow-lg z-50`}
						>
							<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								{navLinks.map((link) => (
									<UnstyledLink
										key={link.href}
										href={link.href}
										className={`block px-3 py-2 rounded-md text-base transition-colors duration-300 ${
											isActive(link.href)
												? "bg-primary-400 text-white font-semibold"
												: "text-gray-400 hover:bg-primary-500 hover:text-white"
										}`}
										onClick={() => setIsOpen(false)}
									>
										{link.label}
									</UnstyledLink>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
