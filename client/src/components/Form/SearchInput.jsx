import React, { useState } from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(search);
    try {
      console.log(search.keyword);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/search/${search.keyword}`
      );
      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <form className="d-flex" role="search" onSubmit={handelSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
