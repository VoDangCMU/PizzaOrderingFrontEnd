const Header : React.FC = () => {
    return (
        <div className={"p-2 md:p-4 w-full border-y-2 border-white"}>
            <div className={"flex justify-center items-center"}>
                <div className={"flex-1"}>
                    <h1 className={"text-2xl text-center"}>Header</h1>
                </div>
            </div>
        </div>
    );
}

export default Header;