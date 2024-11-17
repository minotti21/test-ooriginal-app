export interface QrCodeData {
  name: string;
  description: string;
  url: string;
  additionalData: string;
}

export interface CreateQrCodeBody {
  name: string;
  description: string;
  url: string;
  additional_data: string;
}

export interface FormValidationStatus {
  name: boolean;
  description: boolean;
  url: boolean;
  additionalData: boolean;
}
