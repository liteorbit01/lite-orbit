"use client";

import { useCheckout } from "@/context/CheckoutContext";

export default function ContactForm() {
  const {
    contact,
    setContact,
  } = useCheckout();

  return (
    <section>

      <h2 className="text-2xl mb-6">
        Contact Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="First Name"
          value={contact.firstName}
          onChange={(e) =>
            setContact({
              ...contact,
              firstName: e.target.value,
            })
          }
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={contact.lastName}
          onChange={(e) =>
            setContact({
              ...contact,
              lastName: e.target.value,
            })
          }
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={contact.email}
          onChange={(e) =>
            setContact({
              ...contact,
              email: e.target.value,
            })
          }
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={contact.phone}
          onChange={(e) =>
            setContact({
              ...contact,
              phone: e.target.value,
            })
          }
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

      </div>

    </section>
  );
}