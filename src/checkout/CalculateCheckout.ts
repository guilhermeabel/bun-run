import { createConnection } from "mysql2/promise";
import { Freight, Input, Order, ProductModel, Taxes } from "./types";
import axios from "axios";

export default class CalculateCheckout {

	async execute(input: Input): Promise<Order> {
		const { data: freight } = await axios.get<Freight[]>("http://localhost:4000/freight");

		const taxInformation = taxes.find(tax => tax.country === input.country) || { percentage: 0 };
		const freightInformation = freight.find(freight => freight.country === input.country) || { serviceFee: 0 };

		let subtotal = 0;

		for (const item of input.items) {
			const product = await this.productRepository.find(item.id);
			subtotal += Number(product.price) * item.quantity;
		}

		const tax = subtotal * (taxInformation.percentage) / 100;
		const total = subtotal + tax + freightInformation.serviceFee;

		return {
			subtotal: +subtotal.toFixed(2),
			taxes: +tax.toFixed(2),
			freight: +freightInformation.serviceFee.toFixed(2),
			total: +total.toFixed(2)
		};
	}
}


