import React, { use } from "react";
import { Link } from "react-router";

const SingleProducts = ({ allProductsPromise }) => {
  const products = use(allProductsPromise);
  console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {products.map((product) => (
        <div className="card bg-base-100 shadow-sm">
          <figure className="px-4 pt-4">
            <img src={product.image} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <p>
              Price: ${product.price_min} - ${product.price_max}
            </p>
            <div className="card-actions">
              <Link
                to={`/productDetails/${product._id}`}
                className="btn btn-primary w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleProducts;
