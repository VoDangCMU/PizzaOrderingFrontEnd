import SearchBar from "@/components/custom/layouts/search-bar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

const Header: React.FC = () => {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`sticky top-0 z-50 w-full border-b-4 border-yellow-600 bg-[url(https://i.imgur.com/IDP9MBR.png)] bg-cover bg-center shadow-lg transition-transform duration-300 ${
                isAtTop ? "translate-y-0" : "-translate-y-full"
            } md:min-h-[120px] flex items-center`}
        >
            <div className="w-full mx-auto flex justify-around items-center px-4 md:px-6">
                <div className="flex items-center space-x-4">
                    <Image
                        src="https://i.pinimg.com/736x/bd/b5/bb/bdb5bb315144711296f3c584b1c7561e.jpg"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                </div>

                <div className="w-1/2 flex justify-center">
                    <SearchBar />
                </div>

                <div className="flex space-x-4">
                    <Button className="bg-red-600 text-white font-bold px-4 py-2 rounded-full shadow-md hover:bg-red-700">
                        Login
                    </Button>
                    <Button className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-600">
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
