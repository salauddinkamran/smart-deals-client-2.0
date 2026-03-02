import React, { use } from "react";

const Allproducts = ({ allProductsPromise }) => {
  const products = use(allProductsPromise);
  console.log(products);
  return <div>All Products</div>;
};

export default Allproducts;
