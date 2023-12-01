import fs from "fs";
import productModel from "../model/productModel.js";
import slugify from "slugify";

// CRETAING THE PRODUCT
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is rqeuired" });
      case !description:
        return res.status(500).send({ error: "Description is rqeuired" });
      case !price:
        return res.status(500).send({ error: "Price is rqeuired" });
      case !category:
        return res.status(500).send({ error: "Category is rqeuired" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is rqeuired" });
      case !photo && photo.size > 100000:
        return res
          .status(500)
          .send({ error: "Phone is rqeuired and should be less than 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error,
    });
  }
};

// GETTING THE PRODUCT
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "list fetched Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};
