import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // form function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/register`,
        { name, email, password, phone, address }
      );
      if (res.data.success) {
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <Layout title={"Register - Ecommerce-App"}>
      <div className="register">
        <h1>Register Page</h1>
        <form onSubmit={handelSubmit} className="register-form">
          <div className="form-container  Rcontainer">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="name"
                placeholder="Jhon doe"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                id="email"
                placeholder="example@kuch.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          <div className="form-container Lcontianer">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="phone"
                placeholder="00000000000"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Address
              </label>
              <input
                type="text"
                value={address}
                className="form-control"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                placeholder=""
              />
            </div>
            <button type="submit" className="formBtn btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
