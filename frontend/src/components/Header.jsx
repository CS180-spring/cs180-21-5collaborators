import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../logo.png";
import { useState } from "react";
import { FaPlus, FaSync, FaSignOutAlt, FaDownload } from "react-icons/fa";
import AddPatient from "./AddPatient";
import axios from 'axios';

const Header = ({ onAdd, onReload, setReloadLast20 }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogout = () => {
    axios.get('http://0.0.0.0:3000/logout')
      .then(response => {
        console.log(response);
        // redirect to the login page
        window.location.href = "/login";
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleReload = () => {
    // Trigger the refresh callback in the Dashboard component
    onReload();
    // Set reloadLast20 state to true to refresh the Last20Table component
    setReloadLast20(true);
  };

  const handleExport = () => {
    axios.get('http://0.0.0.0:3000/export')
      .then(response => {
        // Convert the response data to JSON format
        const jsonData = JSON.stringify(response.data);

        // Create a download link and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonData);
        downloadLink.download = 'data.json';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            width="174"
            height="80"
            className="d-inline-block align-top"
            alt="React logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={handleAddNew} className="btn btn-primary mr-4">
              <FaPlus className="mr-1" /> Add New
            </Nav.Link>
            <Nav.Link onClick={handleReload} className="btn btn-success mr-4">
              <FaSync className="mr-1" /> Reload
            </Nav.Link>
            <Nav.Link onClick={handleExport} className="btn btn-warning mr-4">
              <FaDownload className="mr-1" /> Export
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="btn btn-danger">
              <FaSignOutAlt className="mr-1" /> Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AddPatient
        visible={showAddForm}
        onHide={handleCloseAddForm}
        onAdd={onAdd}
      />
    </>
  );
};

export default Header;
