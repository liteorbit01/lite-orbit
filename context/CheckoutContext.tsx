"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Address = {
  country: string;
  province: string;
  city: string;
  postalCode: string;
  street: string;
  apartment: string;
};

export type ContactInformation = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type CheckoutContextType = {
  contact: ContactInformation;
  setContact: React.Dispatch<
    React.SetStateAction<ContactInformation>
  >;

  billing: Address;
  setBilling: React.Dispatch<
    React.SetStateAction<Address>
  >;

  shipping: Address;
  setShipping: React.Dispatch<
    React.SetStateAction<Address>
  >;

  useBillingForShipping: boolean;
  setUseBillingForShipping: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const CheckoutContext =
  createContext<CheckoutContextType | null>(
    null
  );

export function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [contact, setContact] =
    useState<ContactInformation>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

  const [billing, setBilling] =
    useState<Address>({
      country: "",
      province: "",
      city: "",
      postalCode: "",
      street: "",
      apartment: "",
    });

  const [shipping, setShipping] =
    useState<Address>({
      country: "",
      province: "",
      city: "",
      postalCode: "",
      street: "",
      apartment: "",
    });

  const [
    useBillingForShipping,
    setUseBillingForShipping,
  ] = useState(true);

  return (
    <CheckoutContext.Provider
      value={{
        contact,
        setContact,
        billing,
        setBilling,
        shipping,
        setShipping,
        useBillingForShipping,
        setUseBillingForShipping,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context =
    useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      "useCheckout must be used inside CheckoutProvider."
    );
  }

  return context;
}