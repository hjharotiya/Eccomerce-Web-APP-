import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    console.log();
    if (params.slug) getProductByCat();
  }, [useParams.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        ` http://localhost:8000/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`category products`}>
      <div className="container mt-3">
        <h4 className="text-center ">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result Found </h6>
        <div className="row">
          <div className="col-md-9">
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <div
                  key={p?._id}
                  className="card m-2"
                  style={{ width: "17.5rem" }}
                >
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
                      <button
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="btn btn-primary ms-1"
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
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
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
