export interface AuthState {
  email?: string;
  phoneNo?: number;
  password: string;
  method: "email" | "phone" | "";
  setLoginDetails: (
    email?: string,
    phoneNo?: number,
    password?: string,
    method?: "email" | "phone" | ""
  ) => void;
}

export interface User {
  created_at: string;
  email?: string;
  failed_attempts: number;
  is_locked: number;
  location_permission: string;
  password_last_updated: string;
  phone: string;
  updated_at: string;
  user_id: number;
}
export interface RegistrationFormData {
  id_type: string;
  id_number: string;
  salutation: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  dateOfBirth: Date | null;
  age: string;
  bloodGroup: string;
  maritalStatus: string;
  religion: string;
  caste: string;
  occupation: string;
  patient_referral: string;
  nationality: "indian" | "foreigner";
  patientType: "general" | "government" | "corporate" | "tpa";
  patientcategory: "normal" | "vip";
  email: string;
  mobile_number: string;
  patient_address: string;
  pin_code: string;
  city: string;
  state: string;
  country: string;
  relation_type: string;
  relative_name: string;
  relative_number: string;
  pan_number: string;
  pan_holder_name: string;
  pan_relation_type: string;
  tpa_information: string;
  insurance_company: string;
  opd_billing_category: string;
  ipd_billing_category: string;
  discount_scheme: string;
}
