export interface Rep {
  rep_id?: number;
  first_name: string;
  last_name: string;
  phone?: string | null;
  email?: string | null;
  is_active?: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}