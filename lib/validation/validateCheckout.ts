import type {
  Address,
  ContactInformation,
} from "@/context/CheckoutContext";

export function validateCheckout(
  contact: ContactInformation,
  billing: Address,
  useBillingForShipping: boolean,
  shipping: Address
) {
  if (
    !contact.firstName ||
    !contact.lastName ||
    !contact.email ||
    !contact.phone
  ) {
    return false;
  }

  if (
    !billing.country ||
    !billing.province ||
    !billing.city ||
    !billing.postalCode ||
    !billing.street
  ) {
    return false;
  }

  if (!useBillingForShipping) {
    if (
      !shipping.country ||
      !shipping.province ||
      !shipping.city ||
      !shipping.postalCode ||
      !shipping.street
    ) {
      return false;
    }
  }

  return true;
}