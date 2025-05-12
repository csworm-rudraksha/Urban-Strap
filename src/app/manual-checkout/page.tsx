"use client";

import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useCartStore } from "@/hooks/useCartStore";
import { useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";

export default function ManualCheckout() {
  const { cart, clearCart } = useCartStore();
  const wixClient = useWixClient();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields.");
      return;
    }

    if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          cartItems: cart.lineItems,
          subtotal: cart.subtotal?.amount,
        }),
      });

      const data = await res.json();
      alert(data.message || "Order placed!");

      await clearCart(wixClient);
      window.location.href = "/thank-you";
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manual Checkout (COD)</h1>

      {!cart.lineItems || cart.lineItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-6">
            {cart.lineItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center border-b py-4"
              >
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt={item.productName?.original || "Product"}
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium">
                    {item.productName?.original}
                  </div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="font-semibold">
                  ₹{item.price?.amount * item.quantity}
                </div>
              </div>
            ))}
            <div className="text-right font-bold mt-2">
              Total: ₹{cart.subtotal?.amount}
            </div>
          </div>

          {/* Address Form */}
          <div className="space-y-4 mb-6">
            <input
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* Phone Number with +91 prefix */}
            <div className="flex border rounded-md overflow-hidden">
              <span className="px-4 py-2 bg-gray-100 text-gray-600 font-medium select-none">
                +91
              </span>
              <input
                type="tel"
                className="flex-1 px-4 py-2 focus:outline-none"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <textarea
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Delivery Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <div className="text-green-600 text-sm">
              Payment Method: <strong>Cash on Delivery (Pre-selected)</strong>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
