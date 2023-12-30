import { useEffect, useState, useRef } from "react";

import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../components/context/cart";
import { useAuth } from "../components/context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const dropInRef = useRef(null);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instanse, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
        console.log(item.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);

      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // GET PAYMENT GATEWAY TOKEN
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  // HANDEL PAYMENT
  const handelPayment = async () => {
    console.log(dropInRef);
    try {
      setLoading(true);
      const { nonce } = await instanse.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You Have ${cart.length} items in Your cart ${
                    auth?.token ? "" : "Please login for Checkout"
                  } `
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row card flex-row mt-2">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    width={"100px"}
                    //     height={"130px"}
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8 p-1">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p>Price :${p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            {/* <hr /> */}
            <p>Total || Checkout || Payment</p>
            <hr />
            <h4>Total :{totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    {" "}
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    {" "}
                    Please login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: { flow: "vault" },
                }}
                onInstance={(instanse) => {
                  setInstance(instanse);
                }}
              />
              <button className="btn btn-primary" onClick={handelPayment}>
                make Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
