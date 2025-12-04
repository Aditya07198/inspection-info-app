import { Followup } from "./followup";
import { Inquiry } from "./inquiry";
import { OrgLocation } from "./org-location";
import { Rep } from "./rep";

export interface Inspection {
    inspection_order_id: string;
    location_id: string;
    rep_id: string;
    inquiry_id: string;
    order_date: string;
    scheduled_date: string;
    completion_date: string;
    status: string;
    inspection_type: string;
    next_due_date: string;
    followup_start_date: string;
    invoice_raised: boolean;
    invoice_amount: string;
    remarks: string;
    location: OrgLocation;
    rep: Rep;
    inquiry: Inquiry;
    followups: Followup[];
}