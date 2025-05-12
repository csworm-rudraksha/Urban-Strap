import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { form, cartItems, subtotal } = await req.json();

  if (!form?.email || !form?.name || !form?.address || !cartItems) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const adminEmail = "urbanstrap.help@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "urbanstrap.help@gmail.com",
      pass: "agfmlwtzhgqrgblo",
    },
  });

  const cartHtml = cartItems
    .map(
      (item: any) =>
        `<tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.productName?.original}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.price?.amount * item.quantity}</td>
        </tr>`
    )
    .join("");

  const tableHtml = `
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr>
          <th style="padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Product</th>
          <th style="padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Quantity</th>
          <th style="padding: 8px; border: 1px solid #ddd; background-color: #f0f0f0;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${cartHtml}
      </tbody>
    </table>`;

  const plainText = `Order from ${form.name}\nTotal: ₹${subtotal}\nShipping to: ${form.address}`;

  await transporter.sendMail({
    from: 'Rudraksha Store <kushwaharudraksha@gmail.com>',
    to: adminEmail,
    subject: "New Order Received",
    text: plainText,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #333;">New Order Received</h2>
        ${tableHtml}
        <p style="font-size: 16px;"><strong>Total:</strong> ₹${subtotal}</p>
        <h3>Customer Info</h3>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Address:</strong> ${form.address}</p>
      </div>`
  });

  await transporter.sendMail({
    from: 'Rudraksha Store <kushwaharudraksha@gmail.com>',
    to: form.email,
    subject: "Your Order Invoice",
    text: plainText,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Thank you for your order, ${form.name}!</h2>
        <p>Here’s a summary of your purchase:</p>
        ${tableHtml}
        <p style="font-size: 16px;"><strong>Total Amount:</strong> ₹${subtotal}</p>
        <h3>Shipping Address</h3>
        <p>${form.address}</p>
        <br />
        <p style="font-style: italic; color: #555;">Payment Method: Cash on Delivery</p>
      </div>`
  });


  return NextResponse.json({ message: "Order placed & emails sent!" });
  
}