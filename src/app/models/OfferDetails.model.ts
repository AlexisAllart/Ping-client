export interface OfferDetails {
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
    ContractType: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    CompanyUser: {
        id: number;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        company_id: number;
        role_id: number;
        Company: {
            id: number;
            name: string;
            email: string;
            phone: string;
            facebook: string;
            twitter: string;
            linkedin: string;
            link: string;
            logo: string;
            about: string;
            address: string;
            createdAt: Date;
            updatedAt: Date;
        };
        Role: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    };
    KeyWordOne: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    KeyWordTwo: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    KeyWordThree: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
}