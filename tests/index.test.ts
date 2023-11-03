import { expect, test } from "bun:test";
import CalculateCheckout from "../src/checkout/CalculateCheckout";
import ProductRepository from "../src/infra/repository/ProductRepository";
import { TaxesGatewayHttp } from "../src/checkout/TaxesGateway";
import { FreightGatewayHttp } from "../src/checkout/FreightGateway";

test("Should calculate order based on checkout input", async () => {

	const productRepository = new ProductRepository();
	const taxesGateway = new TaxesGatewayHttp();
	const freightGateway = new FreightGatewayHttp();

	// mock taxesGateway.getTaxesInformation
	taxesGateway.getTaxesInformation = async (country) => {
		return { country: country, percentage: 20 };
	};

	// mock freightGateway.getFreightInformation
	freightGateway.getFreightInformation = async (country) => {
		return { country: country, serviceFee: 5 };
	};

	const checkout = new CalculateCheckout(productRepository, taxesGateway, freightGateway);

	const items = [
		{ id: 1, quantity: 2 },
		{ id: 2, quantity: 1 }
	];

	const order = await checkout.execute({
		items: items,
		country: "UK",
		currency: "USD"
	});


	expect(order).toEqual({
		subtotal: 36.99,
		taxes: 7.4,
		freight: 5,
		total: 49.39
	});
}
);
