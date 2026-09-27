import {
  getShoppingCart,
} from "@/app/cart/actions";

import HeaderClient from "./HeaderClient";

export default async function Header() {
  const cart =
    await getShoppingCart();

  return (
    <HeaderClient
      itemCount={
        cart.summary.itemCount
      }
    />
  );
}