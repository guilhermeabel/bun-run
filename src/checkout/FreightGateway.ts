import axios from "axios";
import { Countries, Freight } from "./types";

export interface FreightGateway {
	getFreightInformation(country: Countries): Promise<Freight>;
}

export default class FreightGatewayHttp implements FreightGateway {
	async getFreightInformation(country: Countries): Promise<Freight> {
		const { data: freight } = await axios.get<Freight[]>("http://localhost:4000/freight");
		return freight.find(tax => tax.country === country) || { country: country, serviceFee: 0 };
	}
}


