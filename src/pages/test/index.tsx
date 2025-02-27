import PizzaList from "@/components/custom/contents/pizza-list";
import {pizzaListMock} from "@/mock/pizza-list.mock";

const TestComponent: React.FC = () => {
    return <div><PizzaList pizzas={pizzaListMock}/></div>;
}

export default TestComponent;