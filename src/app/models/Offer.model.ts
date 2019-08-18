export interface Offer {
    id: number;
    addressCity: string;
    addressNumber: string;
    addressStreet: string;
    addressZIPCode: number;
    description: string;
    latitude: number;
    longitude: number;
    salary: number;
    title: string;
    company_id: number;
    companyUser_id: number;
    contractType_id: number;
    keyWordOne_id: number;
    keyWordTwo_id: number;
    keyWordThree_id: number;
    createdAt: Date;
    updatedAt: Date;
}