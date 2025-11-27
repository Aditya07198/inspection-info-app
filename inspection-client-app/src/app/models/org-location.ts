export interface OrgLocation {
    id: string;
    name: string;
    address_1: string;
    address_2?: string;
    city?: string;
    state_province: string;
    postal_code?: string;
    country: string;
    contact_name: string;
    contact_mobile: string;
    contact_email: string;
}