import React, { use } from "react";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
  console.log(products);
  return (
    <div>
      <div>
        {products.map((product) => (
          <product key={product._id} product={product}></product>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
