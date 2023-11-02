import figlet from "figlet";
import CalculateCheckout from "./src/checkout/CalculateCheckout";
import { OrderRepository } from "./src/infra/repository/OrderRepository";

const server = Bun.serve({
  fetch() {
    const body = figlet.textSync("Bun!");

	processCheckout();

    return new Response(body);
  },
  port: 3000,
});


const processCheckout = async () => {
	const checkout = new CalculateCheckout();

	const items = [
		{ id: 1, name: "pen", quantity: 1 },
		{ id: 2, name: "book", quantity: 1 }
	];

	const order = await checkout.execute({
		items: items,
		country: "BR",
		currency: "BRL"
	});

	const orderRepository = new OrderRepository();
	orderRepository.save(order);
}
