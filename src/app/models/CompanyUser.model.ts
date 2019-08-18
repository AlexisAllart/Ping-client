export interface CompanyUser {
    id: number;
    email: string;
    name: string;
    password: string;
    company_id: number;
    role_id: number;
    createdAt: Date;
    updatedAt: Date;
}