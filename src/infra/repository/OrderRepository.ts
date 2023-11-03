import { Order } from "../../checkout/types";
import DatabaseConnection from "../db/DatabaseConnection";

export class OrderRepository {
	async save(order: Order) {

		await DatabaseConnection.execute("INSERT INTO orders (subtotal, taxes, freight, total) VALUES (?, ?, ?, ?)", [
			order.subtotal,
			order.taxes,
			order.freight,
			order.total
		]);

	}

}
