import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <h1 className="text-center mt-2">All Category</h1>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div key={c._id} className="col-md-6 mt-5 mb-3 gx-2 gy-3">
              <Link to={`/category/${c?.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
