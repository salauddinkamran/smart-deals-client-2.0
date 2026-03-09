import React from "react";
import Product from "../Product/Product";
import SingleProducts from "./SingleProducts";

const allProductsPromise = fetch("http://localhost:3000/products").then((res) =>
  res.json(),
);
const Allproducts = () => {
  return (
    <div>
      <SingleProducts allProductsPromise={allProductsPromise}></SingleProducts>
    </div>
  );
};

export default Allproducts;
