import { PizzaCardProps, PizzaListProps } from "@/utils/types";
import PizzaModalComponent from "@/components/custom/contents/pizza-modal";

const PizzaListComponent: React.FC<PizzaListProps> = (props) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 md:p-6">
            {props.pizzas.map((pizza: PizzaCardProps, index: number) => (
                <PizzaModalComponent name={pizza.name} price={pizza.price} image={pizza.image} key={index}/>
            ))}
        </div>
    );
}

export default PizzaListComponent;
