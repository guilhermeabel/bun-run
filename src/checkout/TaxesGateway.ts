import axios from "axios";
import { Countries, Taxes } from "./types";

export default interface TaxesGateway {
	getTaxesInformation(country: Countries): Promise<Taxes>;
}

export class TaxesGatewayHttp implements TaxesGateway {
	async getTaxesInformation(country: Countries): Promise<Taxes> {
		const { data: taxes } = await axios.get<Taxes[]>("http://localhost:4000/taxes");
		return taxes.find(tax => tax.country === country) || { country: country, percentage: 0 };
	}
}


