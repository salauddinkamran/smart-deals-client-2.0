import React from "react";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products",
).then((res) => res.json());
const Home = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-center my-20">This is home</h1>
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
