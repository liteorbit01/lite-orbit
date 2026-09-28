import { taxRates } from "@/data/taxRates";

export function calculateTaxes(
  subtotal: number,
  country: string,
  province: string
) {
  if (!country || !province) {
    return 0;
  }

  const rate =
    taxRates[
      country as keyof typeof taxRates
    ]?.[
      province as never
    ] ?? 0;

  return subtotal * rate;
}