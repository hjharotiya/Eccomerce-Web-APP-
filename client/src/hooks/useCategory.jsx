import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  // get Category

  const getCategores = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/category/get-category`
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategores();
  }, []);
  return categories;
}
