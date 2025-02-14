import {Carousel} from "@/components/ui/carousel";

const HomeComponent : React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 md:p-10">
            <Carousel />
            <h1>Home</h1>
        </div>
    )
}

export default HomeComponent;