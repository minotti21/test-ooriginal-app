import apiClient from ".";
import { CreateQrCodeBody } from "../types/QrCode";

const baseURL =
  "https://qrcode-api-554937473875.southamerica-east1.run.app/qrcode";

const createQrCode = (body: CreateQrCodeBody) => {
  return apiClient.post(baseURL, body);
};

export default {
  createQrCode,
};
