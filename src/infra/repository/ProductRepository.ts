import { ProductModel } from "../../checkout/types";
import DatabaseConnection from "../db/DatabaseConnection";

export default class ProductRepository {
	async find(id: number): Promise<ProductModel> {
		const [rows] = await DatabaseConnection.execute("SELECT * FROM products WHERE id = ? LIMIT 1", [id]);
		return rows;
	}
}
