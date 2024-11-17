import { FormValidationStatus, QrCodeData } from "../../types/QrCode";

const getValidatedFormFields = (
  formData: QrCodeData,
  formValidationStatus: FormValidationStatus,
) => {
  const keys = Object.keys(
    formValidationStatus,
  ) as (keyof FormValidationStatus)[];

  const newFormValidation = { ...formValidationStatus };

  keys.forEach(field => {
    newFormValidation[field] = formData[field].trim().length > 0;
  });

  return newFormValidation;
};

export default {
  getValidatedFormFields,
};
