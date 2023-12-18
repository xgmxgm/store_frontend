export interface IData {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating,
    favorites: boolean,
}

export interface Rating {
    rate: number,
    count: number,
}

export interface ICart {
    products: IData[],
}


export interface IPayment {
    id: string;
    status: string;
    amount: Amount;
    recipient: Recipient;
    payment_method: Paymentmethod;
    created_at: string;
    confirmation: Confirmation;
    test: boolean;
    paid: boolean;
    refundable: boolean;
    metadata: Metadata;
}
interface Metadata {
    email: string;
}
interface Confirmation {
    type: string;
    return_url: string;
    confirmation_url: string;
}
interface Paymentmethod {
    type: string;
    id: string;
    saved: boolean;
}
interface Recipient {
    account_id: string;
    gateway_id: string;
}
interface Amount {
    value: string;
    currency: string;
}