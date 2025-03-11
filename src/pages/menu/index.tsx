import PizzaListComponent from "@/components/contents/pizza-list";
import {pizzaListMock} from "@/mock/pizza-list.mock";

const MenuPage : React.FC = () => {
    const pizzaList = pizzaListMock;
    return (
        <div className="flex flex-col items-center justify-center p-6 md:p-10">
            <PizzaListComponent pizzas={pizzaList} />
        </div>
    )
}

export default MenuPage;