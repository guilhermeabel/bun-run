import figlet from "figlet";
import CalculateCheckout from "./src/checkout/CalculateCheckout";
import { OrderRepository } from "./src/infra/repository/OrderRepository";
import ProductRepository from "./src/infra/repository/ProductRepository";
import TaxesGatewayHttp from "./src/checkout/TaxesGateway";
import FreightGatewayHttp from "./src/checkout/FreightGateway";

const server = Bun.serve({
  fetch() {
    const body = figlet.textSync("Bun!");

	processCheckout();

    return new Response(body);
  },
  port: 3000,
});


export const processCheckout = async () => {
	const productRepository = new ProductRepository();
	const taxesGateway = new TaxesGatewayHttp();
	const freightGateway = new FreightGatewayHttp();

	const checkout = new CalculateCheckout(productRepository, taxesGateway, freightGateway);

	const items = [
		{ id: 1, name: "pen", quantity: 10 },
		{ id: 2, name: "book", quantity: 3 },
		{ id: 3, name: "backpack", quantity: 2 },
		{ id: 4, name: "lamp", quantity: 1 }
	];

	const order = await checkout.execute({
		items: items,
		country: "UK",
		currency: "USD"
	});

	const orderRepository = new OrderRepository();
	orderRepository.save(order);
}
