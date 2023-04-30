import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Table from "../components/Table";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Replace the URL with your API endpoint to fetch data
    const response = await axios.get("https://127.0.0.1/data");
    setData(response.data);
    setFilteredData(response.data);
  };

  const handleSearch = (searchBy, searchTerm) => {
    const results = data.filter((item) => {
      if (searchBy === "name") {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return item.id.toString().includes(searchTerm);
      }
    });
    setFilteredData(results);
  };

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
      <Search onSearch={handleSearch} />
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
