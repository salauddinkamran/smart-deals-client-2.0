import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  // console.log("Token", user.accessToken);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setBids(data);
          } else {
            setBids([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBids(data);
  //         console.log(data);
  //       });
  //   }
  // }, [user]);

  const handleBidsDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Now Delete!");
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter((bid) => bid._id != _id);
              setBids(remainingBids);
            }
          });
      }
    });
  };
  return (
    <div>
      <h3 className="text-4xl font-bold text-center mt-5">
        My Bids: <span className="text-primary">{bids.length}</span>
      </h3>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>SL NO.</th>
            <th>Buyer Name</th>
            <th>Buyer Email</th>
            <th>Bid Price</th>
            <th>Status</th>
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
              <td>
                {bid.status === "pending" ? (
                  <div className="badge badge-warning text-white">
                    {bid.status}
                  </div>
                ) : (
                  <div className="badge badge-success text-white">
                    {bid.status}
                  </div>
                )}
              </td>
              <th>
                <button
                  onClick={() => handleBidsDelete(bid._id)}
                  className="btn btn-outline btn-xs"
                >
                  Remove Bid
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBids;
