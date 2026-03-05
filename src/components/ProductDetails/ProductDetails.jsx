import React, { use, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const {
    _id: productId,
    image,
    title,
    price_max,
    price_min,
  } = useLoaderData();
  const bidsModalRef = useRef(null);
  const { user } = use(AuthContext);

  const handleBidAmount = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(productId, name, email, bid);
    const newBids = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_price: bid,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After placeing bid", data);
        toast("Your bid place successfuly!")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="w-full">
          <img src={image} alt="" />
        </div>
        <div className="w-full">
          <h3 className="text-3xl font-bold mb-3">{title}</h3>
          <p>
            ${price_min} - ${price_max}
          </p>
          <button
            onClick={() => bidsModalRef.current.showModal()}
            className="btn btn-primary"
          >
            I want to By this product
          </button>
          <dialog
            ref={bidsModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>

              <form onSubmit={handleBidAmount}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="name"
                    readOnly
                    placeholder="Email"
                    defaultValue={user?.displayName}
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    name="email"
                    readOnly
                    defaultValue={user?.email}
                  />
                  <label className="label">Bid Amount</label>
                  <input
                    type="text"
                    className="input w-full"
                    name="bid"
                    placeholder="Bid Amount"
                  />
                  <button className="btn btn-neutral mt-4">
                    place your bid
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
