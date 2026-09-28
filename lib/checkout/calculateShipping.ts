export function calculateShipping(
  subtotal: number,
  country: string
) {
  if (!country) {
    return 0;
  }

  // 🇨🇦 Canada
  if (country === "CA") {
    if (subtotal >= 150) {
      return 0;
    }

    return 15;
  }

  // 🇺🇸 United States
  if (country === "US") {
    if (subtotal >= 200) {
      return 0;
    }

    return 25;
  }

  return 40;
}