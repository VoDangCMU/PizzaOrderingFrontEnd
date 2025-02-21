import SearchBar from "@/components/custom/layouts/search-bar";

const Header : React.FC = () => {
    return (
        <div className={"p-2 md:p-4 w-full border-y-2 border-white bg-[url(https://i.imgur.com/IDP9MBR.png)] min-h-fit"}>
            <div className={"flex justify-center items-center"}>
                <div className={"w-1/2"}>

                    <SearchBar />

                    
                </div>
            </div>
        </div>
    );
}

export default Header;