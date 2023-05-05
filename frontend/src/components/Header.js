import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../logo.png";
import { useState } from "react";
import { FaPlus, FaSync, FaSignOutAlt } from "react-icons/fa";
import AddForm from "./AddForm";

const Header = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogout = () => {
    // Redirect to login or home page
    window.location.href = "/login";
  };

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            width="178"
            height="30"
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
            <Nav.Link href="#reload" className="btn btn-success mr-4">
              <FaSync className="mr-1" /> Reload
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="btn btn-danger">
              <FaSignOutAlt className="mr-1" /> Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AddForm show={showAddForm} handleClose={handleCloseAddForm} />
    </>
  );
};

export default Header;