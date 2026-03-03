import React from "react";
import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  return <div>products details</div>;
};

export default ProductDetails;
