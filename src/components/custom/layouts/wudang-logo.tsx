import type { SVGProps } from "react";

export function WudangLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            {/* Ancient Seal Background */}
            <circle cx="50" cy="50" r="45" fill="#8B4513" stroke="#DAA520" strokeWidth="3" />

            {/* Taiji (Yin-Yang) Symbol */}
            <path
                d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm0 67.5c-12.4 0-22.5-10.1-22.5-22.5S37.6 27.5 50 27.5 72.5 37.6 72.5 50 62.4 72.5 50 72.5z"
                fill="#000000"
            />

            {/* Small Circles */}
            <circle cx="50" cy="27.5" r="5" fill="#8B4513" />
            <circle cx="50" cy="72.5" r="5" fill="#000000" />

            {/* Pizza Slice Overlay */}
            <path d="M50 15L85 65H15L50 15Z" fill="#D2B48C" stroke="#8B4513" strokeWidth="2" />

            {/* Pepperoni */}
            <circle cx="50" cy="35" r="4" fill="#8B0000" />
            <circle cx="40" cy="45" r="3" fill="#8B0000" />
            <circle cx="60" cy="45" r="3" fill="#8B0000" />
            <circle cx="35" cy="55" r="3" fill="#8B0000" />
            <circle cx="65" cy="55" r="3" fill="#8B0000" />

            {/* Ancient Chinese Characters (Simplified) */}
            <text x="30" y="40" fill="#8B4513" fontFamily="serif" fontSize="8" fontWeight="bold">
                武
            </text>
            <text x="60" y="40" fill="#8B4513" fontFamily="serif" fontSize="8" fontWeight="bold">
                当
            </text>

            {/* Crossed Swords */}
            <line x1="35" y1="75" x2="65" y2="25" stroke="#DAA520" strokeWidth="2" />
            <line x1="35" y1="25" x2="65" y2="75" stroke="#DAA520" strokeWidth="2" />

            {/* Sword Hilts */}
            <rect x="30" y="20" width="10" height="5" fill="#8B4513" />
            <rect x="60" y="20" width="10" height="5" fill="#8B4513" />
            <rect x="30" y="75" width="10" height="5" fill="#8B4513" />
            <rect x="60" y="75" width="10" height="5" fill="#8B4513" />
        </svg>
    );
}