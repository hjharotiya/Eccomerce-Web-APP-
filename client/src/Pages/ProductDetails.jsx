import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // GET SIMILAR PRODUCTS
  const getSimilarProduct = async (pid, cid) => {
    try {
      console.log(pid, cid);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/similar/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
      console.log(relatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:8000/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product?.name}
            height={"400"}
            width={"350px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name:{product?.name}</h6>
          <h6>Description:{product?.description}</h6>
          <h6>Price:{product?.price}</h6>
          {/* <h6>Category:{product.category.name}</h6> */}
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row">
        <h1>Similar Products</h1>
        <div className="d-flex flex-wrap">
          {relatedProduct.map((p) => (
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
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
