import React from "react";
import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  return (
    <div>
      <div className="flex items-center">
        <div className="w-full">
          <img src={product.image} alt="" />
        </div>
        <div className="w-full">
          <h3 className="text-3xl font-bold mb-3">{product.title}</h3>
          <button className="btn btn-primary">I want to By this product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
