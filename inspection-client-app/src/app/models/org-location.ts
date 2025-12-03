export interface OrgLocation {
    location_id: string;
    location_name: string;
    address_1: string;
    address_2?: string;
    unit_number?: string;
    city?: string;
    state_province: string;
    postal_code?: string;
    country: string;
    contact_name: string;
    contact_mobile: string;
    contact_office_phone?: string;
    phone_ext?: string;
    contact_fax?: string;
    contact_email: string;
    organization_type?: string;
    created_at?: string;
    updated_at?: string;
}