// AddForm.js
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

const AddForm = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: null,
    neighborhood: "",
    appointment_id: "",
    appointment_date: null,
    scheduled_date: null,
    scholarship: false,
    alcoholism: false,
    handicap: false,
    hypertension: false,
    diabetes: false,
    sms_received: false,
    no_show: "",
  });

  const genders = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
  ];

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Implement the actual submit logic here
  };

  return (
    <Dialog visible={show} onHide={handleClose} header="Add New Appointment">
      <form onSubmit={handleSubmit}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Patient Name</label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="age">Age</label>
            <InputText
              id="age"
              name="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="gender">Gender</label>
            <Dropdown
              id="gender"
              name="gender"
              options={genders}
              value={formData.gender}
              onChange={handleGenderChange}
              placeholder="Select"
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="neighborhood">Neighborhood</label>
            <InputText
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="appointment_id">Appointment ID</label>
            <InputText
              id="appointment_id"
              name="appointment_id"
              value={formData.appointment_id}
              onChange={(e) => setFormData({ ...formData, appointment_id: e.target.value })}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="appointment_date">Appointment Date</label>
            <Calendar
              id="appointment_date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={(e) => setFormData({ ...formData, appointment_date: e.value })}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="scheduled_date">Scheduled Date</label>
            <Calendar
                            id="scheduled_date"
                            name="scheduled_date"
                            value={formData.scheduled_date}
                            onChange={(e) => setFormData({ ...formData, scheduled_date: e.value })}
                            required
                          />
                        </div>
                        <div className="p-field">
                          <Checkbox
                            inputId="scholarship"
                            name="scholarship"
                            checked={formData.scholarship}
                            onChange={(e) => setFormData({ ...formData, scholarship: e.checked })}
                          />
                          <label htmlFor="scholarship">Scholarship</label>
                        </div>
                        <div className="p-field">
                          <Checkbox
                            inputId="alcoholism"
                            name="alcoholism"
                            checked={formData.alcoholism}
                            onChange={(e) => setFormData({ ...formData, alcoholism: e.checked })}
                          />
                          <label htmlFor="alcoholism">Alcoholism</label>
                        </div>
                        <div className="p-field">
                          <Checkbox
                            inputId="handicap"
                            name="handicap"
                            checked={formData.handicap}
                            onChange={(e) => setFormData({ ...formData, handicap: e.checked })}
                          />
                          <label htmlFor="handicap">Handicap</label>
                        </div>
                        <div className="p-field">
                          <Checkbox
                            inputId="hypertension"
                            name="hypertension"
                            checked={formData.hypertension}
                            onChange={(e) => setFormData({ ...formData, hypertension: e.checked })}
                          />
                          <label htmlFor="hypertension">Hypertension</label>
                        </div>
                        <div className="p-field">
                          <Checkbox
                            inputId="diabetes"
                            name="diabetes"
                            checked={formData.diabetes}
                            onChange={(e) => setFormData({ ...formData, diabetes: e.checked })}
                          />
                          <label htmlFor="diabetes">Diabetes</label>
                        </div>
                        <div className="p-field">
                          <Checkbox
                            inputId="sms_received"
                            name="sms_received"
                            checked={formData.sms_received}
                            onChange={(e) => setFormData({ ...formData, sms_received: e.checked })}
                          />
                          <label htmlFor="sms_received">SMS Received</label>
                        </div>
                        <div className="p-field">
                          <label htmlFor="no_show">No-Show</label>
                          <Dropdown
                            id="no_show"
                            name="no_show"
                            options={[
                              { label: "Yes", value: "yes" },
                              { label: "No", value: "no" },
                            ]}
                            value={formData.no_show}
                            onChange={(e) => setFormData({ ...formData, no_show: e.value })}
                            placeholder="Select"
                            required
                          />
                        </div>
                      </div>
                      <div className="p-dialog-footer">
                        <Button label="Submit" icon="pi pi-check" className="p-button-success" />
                        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={handleClose} />
                      </div>
                    </form>
                  </Dialog>
                );
              };
              
              export default AddForm;
              
             
