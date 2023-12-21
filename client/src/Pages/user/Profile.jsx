import { React, useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../components/context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // GET USER DATA
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, []);

  // form function
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile Updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <h1>User Profile</h1>
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
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
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
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
