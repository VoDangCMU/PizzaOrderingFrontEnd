import type { SVGProps } from "react";

export function ModernLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="50" cy="50" r="45" fill="url(#pizzaGradient)" />

            <path d="M50 15L85 65H15L50 15Z" fill="#FFDC80" stroke="url(#crustGradient)" strokeWidth="2" />

            {/* Pepperoni with 3D effect */}
            <circle cx="50" cy="35" r="6" fill="url(#pepperoniGradient)" filter="url(#dropShadow)" />
            <circle cx="35" cy="45" r="5" fill="url(#pepperoniGradient)" filter="url(#dropShadow)" />
            <circle cx="65" cy="45" r="5" fill="url(#pepperoniGradient)" filter="url(#dropShadow)" />
            <circle cx="42" cy="55" r="4" fill="url(#pepperoniGradient)" filter="url(#dropShadow)" />
            <circle cx="58" cy="55" r="4" fill="url(#pepperoniGradient)" filter="url(#dropShadow)" />

            {/* Modern martial arts symbol */}
            <path d="M50 25C45 30 40 40 50 50C60 40 55 30 50 25Z" fill="url(#leafGradient)" filter="url(#glow)" />

            {/* Crossed swords - modern minimalist style */}
            <line x1="35" y1="75" x2="65" y2="25" stroke="url(#swordGradient)" strokeWidth="2" strokeLinecap="round" />
            <line x1="35" y1="25" x2="65" y2="75" stroke="url(#swordGradient)" strokeWidth="2" strokeLinecap="round" />

            {/* Sword hilts with modern styling */}
            <rect x="30" y="20" width="10" height="5" rx="2" fill="url(#hiltGradient)" />
            <rect x="60" y="20" width="10" height="5" rx="2" fill="url(#hiltGradient)" />
            <rect x="30" y="75" width="10" height="5" rx="2" fill="url(#hiltGradient)" />
            <rect x="60" y="75" width="10" height="5" rx="2" fill="url(#hiltGradient)" />

            {/* Gradients definitions */}
            <defs>
                <linearGradient id="pizzaGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF416C" />
                    <stop offset="100%" stopColor="#FF4B2B" />
                </linearGradient>

                <linearGradient id="crustGradient" x1="15" y1="65" x2="85" y2="15" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E2994A" />
                    <stop offset="100%" stopColor="#C67D31" />
                </linearGradient>

                <radialGradient id="pepperoniGradient" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#FF5252" />
                    <stop offset="100%" stopColor="#D32F2F" />
                </radialGradient>

                <linearGradient id="swordGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#B2DFDB" />
                    <stop offset="100%" stopColor="#80CBC4" />
                </linearGradient>

                <linearGradient id="hiltGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="100%" stopColor="#FFCA28" />
                </linearGradient>

                <linearGradient id="leafGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0%" stopColor="#66BB6A" />
                    <stop offset="100%" stopColor="#43A047" />
                </linearGradient>

                <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
                </filter>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
        </svg>
    );
}