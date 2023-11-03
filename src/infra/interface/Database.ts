export interface Database {
	execute(query: string, params: any): Promise<any>;
}
