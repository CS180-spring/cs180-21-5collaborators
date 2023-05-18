import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../logo.png";
import { useState } from "react";
import { FaPlus, FaSync, FaSignOutAlt } from "react-icons/fa";
import AddPatient from "./AddPatient";
import axios from 'axios';

const Header = ({ onAdd, onReload,setReloadLast20 }) => {
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
            <Nav.Link href="#reload" className="btn btn-success mr-4" onClick={handleReload}>
      <FaSync className="mr-1" /> Reload
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
