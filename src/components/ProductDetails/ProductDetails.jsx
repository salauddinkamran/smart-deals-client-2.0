import React, { use, useEffect, useRef, useState } from "react";
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
  const [bids, setBids] = useState([]);

  const handleBidAmount = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = Number(e.target.bid.value);
    console.log(productId, name, email, bid);
    const newBid = {
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
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After placeing bid", data);
        toast("Your bid place successfuly!");
        if (data.insertedId) {
          bidsModalRef.current.close();
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.buyer_price - a.buyer_price);
          setBids(newBids);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bids fot this product", data);
        setBids(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId, user]);
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="w-full">
          <img className="" src={image} alt="" />
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
      <div className="mt-10">
        <h3 className="text-3xl font-bold">
          Bids fot this Product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL NO.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.buyer_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
