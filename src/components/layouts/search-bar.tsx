import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router";

const SearchBar: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const wsRef = useRef<WebSocket | null>(null);
    const apiDomain = typeof window !== 'undefined' ? localStorage.getItem("ai_domain") : null;
    const router = useRouter();
    const limit = 5;

    useEffect(() => {
        if (!apiDomain) return;

        wsRef.current = new WebSocket(`${apiDomain}/ws/suggest`);
        wsRef.current.onopen = () => {
            console.log("WebSocket connection opened");
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [apiDomain, limit]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ query: value, limit: limit }));
        }
    };

    const handleSearch = async () => {
        if (!inputValue) return;
        await router.push(`/search?keyword=${inputValue}`);
    };

    return (
        <div className="w-full max-w-xl min-w-[200px] min-h-fit">
            <div className="relative">
                <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow min-h-fit"
                    placeholder="Search your idea..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button
                    className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handleSearch}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;