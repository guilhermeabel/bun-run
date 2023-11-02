import { expect, test } from "bun:test";
import CalculateCheckout from "../src/checkout/CalculateCheckout";

test("Should calculate order based on checkout input", async () => {

	const checkout = new CalculateCheckout();

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
