import React from "react";
import { useLoaderData } from "react-router";

const Allproducts = () => {
  const products = useLoaderData();
  console.log(products);
  return <div>All Products</div>;
};

export default Allproducts;
