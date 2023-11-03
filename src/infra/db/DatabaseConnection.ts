import { Connection, createConnection } from "mysql2/promise";

export default class DatabaseConnection {
	private static connection: Connection;

	static async getConnection(): Promise<Connection> {
		if (this.connection) {
			return this.connection;
		}

		const connection = await createConnection({
			host: "localhost",
			port: 3306,
			user: "root",
			database: "test",
			password: "abel"
		});

		return this.connection = connection;
	}

	static async execute(query: string, params: any): Promise<any> {
		const connection = await DatabaseConnection.getConnection();
		const [rows] = await connection.execute(query, params);
		return rows;
	}

}
