// import { wixClientServer } from "@/lib/wixClientServer";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { form, cartItems } = await req.json();

//     if (!cartItems || !Array.isArray(cartItems)) {
//       console.error("Invalid or missing cartItems:", cartItems);
//       return NextResponse.json({ success: false, error: "Invalid cartItems" }, { status: 400 });
//     }

//     const wixClient = await wixClientServer();

//     const productIds: string[] = cartItems.map((item: any) => {
//       if (!item.catalogReference || !item.catalogReference.catalogItemId) {
//         console.error("Missing catalogReference in item:", item);
//         throw new Error("Invalid item structure");
//       }
//       return item.catalogReference.catalogItemId;
//     });

//     await wixClient.data.insert("Orders", {
//       name: form.name,
//       email: form.email,
//       phone: form.phone || "",
//       address: form.address,
//       items: productIds,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error in /api/storeOrder:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
