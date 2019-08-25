export class Offre {
    constructor(
        public job_name: string,
        public company_name: string,
        public description: string,
        public contract_type: string,
        // is optionnal
        public salary?: number,
        public keyword?: string,
    ) {}
}
