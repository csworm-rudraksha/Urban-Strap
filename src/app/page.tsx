// "use client";

import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { WixClientContext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {

  // TEST (FETCHING ON THE CLIENT COMPONENT)

  // const wixClient = useWixClient()

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();

  //     console.log(res)
  //   };

  //   getProducts();
  // }, [wixClient]);
  

  // TEST (FETCHING ON THE SERVER COMPONENT)

  // const wixClient = await wixClientServer();

  // const res = await wixClient.products.queryProducts().find();

  // console.log(res);

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={12}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      
        {/* <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense> */}
<section id="about" className="px-6 py-12 md:px-16 lg:px-32 bg-white text-gray-800">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Urban-Strap</h2>
    <p className="text-lg md:text-xl text-gray-600 font-medium mb-6">
      <em>Wear Your Attitude</em>
    </p>
    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
      At <strong>Urban-Strap</strong>, fashion is more than just what you wear —
      it’s a bold expression of who you are. Rooted in urban aesthetics and
      driven by comfort, our designs are crafted to match your individuality and
      lifestyle.
    </p>
    <p className="text-base md:text-lg text-gray-700 mt-4 leading-relaxed">
      Whether you're out in the city or chilling with friends, our collections
      help you show up with confidence and ease. We don’t follow trends — we
      create a vibe.
    </p>
    <p className="mt-6 font-semibold text-gray-900">Urban-Strap. Wear your attitude.</p>
  </div>
</section>

      
    </div>
  );
};

export default HomePage;
