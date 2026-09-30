import {
  getExistingCartItems,
} from "@/lib/cart/service";

import HeaderClient from "./HeaderClient";

export default async function Header() {

  const cart =
    await getExistingCartItems();

  return (
    <HeaderClient
      itemCount={
        cart.summary.itemCount
      }
    />
  );
}