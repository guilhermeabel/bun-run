import { ResultSetHeader, RowDataPacket } from "mysql2";

export type Input = {
	items: CheckoutProduct[];
	country: Countries;
	currency: string;
};
export type CheckoutProduct = {
	id: number;
	name?: string;
	quantity: number;
}
export type Order = {
	subtotal: number;
	taxes: number;
	freight: number;
	total: number;
};

export type Taxes = {
	country: Countries;
	percentage: number;
}

export type Freight = {
	country: Countries;
	serviceFee: number;
}

export type Countries = "BR" | "US" | "UK" | "AR";

export interface ProductModel {
	id: number;
	name: string;
	price: number;
	sku: string;
}
