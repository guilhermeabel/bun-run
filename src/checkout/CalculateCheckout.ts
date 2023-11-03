import { Input, Order } from "./types";
import ProductRepository from "../infra/repository/ProductRepository";
import TaxesGatewayHttp from "./TaxesGateway";
import FreightGatewayHttp from "./FreightGateway";

export default class CalculateCheckout {

	constructor(
		private productRepository: ProductRepository,
		private taxesGateway: TaxesGatewayHttp,
		private freightGateway: FreightGatewayHttp
	) { }

	async execute(input: Input): Promise<Order> {
		const taxInformation = await this.taxesGateway.getTaxesInformation(input.country);

		const freightInformation = await this.freightGateway.getFreightInformation(input.country);

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


