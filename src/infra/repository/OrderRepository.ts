import { createConnection } from "mysql2/promise";
import { Order } from "../../checkout/types";

export class OrderRepository {
	async save(order: Order) {

		const connection = await createConnection({
			host: "localhost",
			port: 3306,
			user: "root",
			database: "test",
			password: "abel"
		});

		await connection.execute("INSERT INTO orders (subtotal, taxes, freight, total) VALUES (?, ?, ?, ?)", [
			order.subtotal,
			order.taxes,
			order.freight,
			order.total
		]);

	}

}
