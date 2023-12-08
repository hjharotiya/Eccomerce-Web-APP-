import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const getAllCategory = async () => {
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
  // handel update form
  const handelUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        ` http://localhost:8000/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating category");
    }
  };

  // handel Delete form
  const handelDeleteSubmit = async (pId) => {
    try {
      const { data } = await axios.delete(
        ` http://localhost:8000/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while Deleting category");
    }
  };

  // handel form
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in input form");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handelSubmit={handelSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name} </td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>{" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handelDeleteSubmit(c._id);
                            }}
                          >
                            Delete
                          </button>{" "}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handelSubmit={handelUpdateSubmit}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
