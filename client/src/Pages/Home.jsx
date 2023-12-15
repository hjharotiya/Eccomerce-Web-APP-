import { useEffect, useState } from "react";
import { useAuth } from "../components/context/auth";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // GET ALL CATEGORIES

  const getAllCategories = async () => {
    try {
      const { data } = await axios(
        "http://localhost:8000/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in getting category");
    }
  };

  // Get ALL products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    laodMore();
  }, [page]);

  // LOAD MORE
  const laodMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.product]);
      console.log(products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // FILTER BY CATEGORY
  const handelFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // GET TOTAL COUNT
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) flterProduct();
  }, [checked, radio]);

  // get filter Product

  const flterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"All Products - Best offers"}>
        <div className="row mt-3">
          <div className="col-md-2">
            <h4 className="text-center">Filter by category</h4>
            <div className="d-flex flex-column">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handelFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* Price filter */}
            <h4 className="text-center mt-3">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <div className="" key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-2">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "17.5rem" }}>
                    <div>
                      <img
                        src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="card-text"> $ {p.price}</p>
                        <button className="btn btn-primary ms-1">
                          More Details
                        </button>
                        <button className="btn btn-secondary ms-1">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "loading" : "laod more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
