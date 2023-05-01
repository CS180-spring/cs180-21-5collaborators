import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Table from "../components/Table";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const formik = useFormik({
    initialValues: {
      searchBy: "",
      searchValue: "",
    },
    onSubmit: (e) => handleSubmit(e),
  });

  const handleSubmit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Replace the URL with your API endpoint to fetch data
    const response = await axios.get("https://127.0.0.1/data");
    setData(response.data);
    setFilteredData(response.data);
  };

  useEffect(() => {
    const searchData = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:3000/getInfo?id=${formik.values.searchValue}`
        );
        setFilteredData(data);
      } catch (error) {
        console.log(error);
      }
    };
    searchData();
  }, [formik.values.searchValue]);

  const handleAdd = () => {
    console.log("Add new item");
  };

  const handleReload = () => {
    fetchData();
  };

  const handleView = (id) => {
    console.log("View item:", id);
  };

  const handleUpdate = (id) => {
    console.log("Update item:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete item:", id);
  };

  return (
    <>
      <Header onAdd={handleAdd} onReload={handleReload} />
      <Search formik={formik} />
      <Table
        data={filteredData}
        onView={handleView}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Dashboard;
