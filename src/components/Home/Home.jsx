import React from "react";
import Allproducts from "../Allproducts/Allproducts";

const allProductsPromise = fetch("http://localhost:3000/products").then((res) =>
  res.json(),
);
const Home = () => {
  return (
    <div>
      <Allproducts allProductsPromise={allProductsPromise}></Allproducts>
    </div>
  );
};

export default Home;
