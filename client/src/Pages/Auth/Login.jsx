import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // form function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/");
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
    <Layout title={"Login - Ecommerce-App"}>
      <div className="register">
        <h1>Login Form</h1>
        <form onSubmit={handelSubmit} className="Login-form">
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
          <button type="submit" className="formBtn btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
