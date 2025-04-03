//scr/components/custom/auth/register-form.tsx
export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}

//scr/components/custom/content/pizza-category-card.tsx
export interface PizzaCardProps {
    name: string;
    price: number;
    image: string;
}


//scr/components/custom/content/pizza-category-list.tsx
export interface PizzaListProps {
    pizzas: PizzaCardProps[];
}

export interface PizzaResponse{
    name: string;
    unitPrice: number;
    id : string;
    description : string;
}


export interface PizzaCategoryResponse {
    name: string;
    description: string;
    id : string;
}