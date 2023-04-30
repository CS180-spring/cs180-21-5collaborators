// AddForm.js
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddForm = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    appointment_id: "",
    gender: "",
    scheduled_date: "",
    appointment_date: "",
    age: "",
    neighborhood: "",
    scholarship: false,
    hypertension: false,
    diabetes: false,
    alcoholism: false,
    handicap: false,
    sms_received: false,
    no_show: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Implement the actual submit logic here
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Add form fields for each data field here */}
          {/* Example: */}
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="appointment_id">
            <Form.Label>Appointment ID</Form.Label>
            <Form.Control
              type="text"
              name="appointment_id"
              value={formData.appointment_id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="scheduled_date">
            <Form.Label>Scheduled Date</Form.Label>
            <Form.Control
              type="date"
              name="scheduled_date"
              value={formData.scheduled_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="appointment_date">
            <Form.Label>Appointment Date</Form.Label>
            <Form.Control
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="neighborhood">
            <Form.Label>Neighborhood</Form.Label>
            <Form.Control
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="scholarship">
            <Form.Check
              type="checkbox"
              name="scholarship"
              label="Scholarship"
              checked={formData.scholarship}
              onChange={(e) =>
                setFormData({ ...formData, scholarship: e.target.checked })
              }
            />
          </Form.Group>

          <Form.Group controlId="hypertension">
            <Form.Check
              type="checkbox"
              name="hypertension"
              label="Hypertension"
              checked={formData.hypertension}
              onChange={(e) =>
                setFormData({ ...formData, hypertension: e.target.checked })
              }
            />
          </Form.Group>

          <Form.Group controlId="diabetes">
            <Form.Check
              type="checkbox"
              name="diabetes"
              label="Diabetes"
              checked={formData.diabetes}
              onChange={(e) =>
                setFormData({ ...formData, diabetes: e.target.checked })
              }
            />
          </Form.Group>

          <Form.Group controlId="alcoholism">
            <Form.Check
              type="checkbox"
              name="alcoholism"
              label="Alcoholism"
              checked={formData.alcoholism}
              onChange={(e) =>
                setFormData({ ...formData, alcoholism: e.target.checked })
              }
            />
          </Form.Group>

          <Form.Group controlId="handicap">
            <Form.Check
              type="checkbox"
              name="handicap"
              label="Handicap"
              checked={formData.handicap}
              onChange={(e) =>
                setFormData({ ...formData, handicap: e.target.checked })
              }
            />
          </Form.Group>

          <Form.Group controlId="sms_received">
            <Form.Check
              type="checkbox"
              name="sms_received"
              label="SMS Received"
              checked={formData.sms_received}
              onChange={(e) =>
                setFormData({ ...formData, sms_received: e.target.checked })
              }
            />
          </Form.Group>

          <Form.Group controlId="no_show">
            <Form.Label>No-Show</Form.Label>
            <Form.Control
              as="select"
              name="no_show"
              value={formData.no_show}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>
          {/* Add remaining form fields */}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddForm;
