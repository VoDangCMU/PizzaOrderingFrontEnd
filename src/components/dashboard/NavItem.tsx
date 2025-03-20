import Link from "next/link";
import type React from "react";
type NavItemProps = {
    href: string
    icon: React.ReactNode
    text: string
    active: boolean
}
export default function NavItem({ href, icon, text, active }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                active
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
        >
            {icon}
            {text}
        </Link>
    )
}