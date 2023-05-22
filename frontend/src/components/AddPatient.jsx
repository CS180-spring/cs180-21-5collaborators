import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";

const AddPatient = ({ visible, onHide, onAdd }) => {
  const emptyPatient = {
    PatientName: "",
    Age: "",
    AppointmentID: "",
    Gender: "",
    ScheduledDay: "",
    AppointmentDay: "",
    Neighbourhood: "",
    Scholarship: "",
    Hipertension: "",
    Diabetes: "",
    Alcoholism: "",
    Handcap: "",
    SMS_received: "",
    "No-show": "",
  };

  const [newPatient, setNewPatient] = useState(emptyPatient);

  const genderOptions = [
    { label: "M", value: "M" },
    { label: "F", value: "F" },
  ];

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const handleInputChange = (e, field) => {
    setNewPatient({ ...newPatient, [field]: e.target.value });
  };

  const handleDropdownChange = (e, field) => {
    setNewPatient({ ...newPatient, [field]: e.value });
  };

  const handleNumberChange = (e, field) => {
    setNewPatient({ ...newPatient, [field]: e.value });
  };

  const handleSubmit = () => {
    const nonCheckboxFields = ["PatientName", "Age", "AppointmentID", "Gender", "ScheduledDay", 
                              "AppointmentDay", "Neighbourhood", "No-show"];
    const allFilled = nonCheckboxFields.every(field => newPatient[field] !== null && newPatient[field] !== '');
  
    if(allFilled) {
      onAdd(newPatient);
      setNewPatient(emptyPatient);
    } else {
      alert('Please fill in all fields.');
    }
  };
  
  const renderFooter = () => {
    return (
      <div>
        <Button label="Cancel" icon="pi pi-times" onClick={onHide} />
        <Button label="Add" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    );
  };

  return (
    <Dialog
      header="Add Patient"
      visible={visible}
      onHide={onHide}
      footer={renderFooter()}
      style={{ width: "50vw" }}
    >
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="patientName">Patient Name</label>
          <InputText
            id="patientName"
            value={newPatient.PatientName}
            onChange={(e) => handleInputChange(e, "PatientName")}
          />
        </div>
        <div className="p-field">
          <label htmlFor="age">Age</label>
          <InputNumber
            id="age"
            value={newPatient.Age}
            onValueChange={(e) => handleNumberChange(e, "Age")}
            integeronly
          />
        </div>
        <div className="p-field">
          <label htmlFor="gender">Gender</label>
          <Dropdown
            id="gender"
            value={newPatient.Gender}
            options={genderOptions}
            onChange={(e) => handleDropdownChange(e, "Gender")}
          />
        </div>
        <div className="p-field">
          <label htmlFor="neighbourhood">Neighbourhood</label>
          <InputText
            id="neighbourhood"
            value={newPatient.Neighbourhood}
            onChange={(e) => handleInputChange(e, "Neighbourhood")}
          />
        </div>
        <div className="p-field">
          <label htmlFor="appointmentID">Appointment ID</label>
          <InputText
            id="appointmentID"
            value={newPatient.AppointmentID}
            onChange={(e) => handleInputChange(e, "AppointmentID")}
          />
        </div>
        <div className="p-field">
          <label htmlFor="appointmentDay">Appointment Day</label>
          <Calendar
            id="appointmentDay"
            value={
              newPatient.AppointmentDay
                ? new Date(newPatient.AppointmentDay)
                : null
            }
            onChange={(e) => handleInputChange(e, "AppointmentDay")}
            dateFormat="yy-mm-dd"
            showIcon
          />
        </div>
        <div className="p-field">
          <label htmlFor="scheduledDay">Scheduled Day</label>
          <Calendar
            id="scheduledDay"
            value={
              newPatient.ScheduledDay ? new Date(newPatient.ScheduledDay) : null
            }
            onChange={(e) => handleInputChange(e, "ScheduledDay")}
            dateFormat="yy-mm-dd"
            showIcon
          />
        </div>
        <div className="p-field">
          <label htmlFor="scholarship">Scholarship</label>
          <Checkbox
            id="scholarship"
            checked={newPatient.Scholarship === 1}
            onChange={(e) =>
              setNewPatient({ ...newPatient, Scholarship: e.checked ? 1 : 0 })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="alcoholism">Alcoholism</label>
          <Checkbox
            id="alcoholism"
            checked={newPatient.Alcoholism === 1}
            onChange={(e) =>
              setNewPatient({ ...newPatient, Alcoholism: e.checked ? 1 : 0 })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="handcap">Handcap</label>
          <Checkbox
            id="handcap"
            checked={newPatient.Handcap === 1}
            onChange={(e) =>
              setNewPatient({ ...newPatient, Handcap: e.checked ? 1 : 0 })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="hipertension">Hipertension</label>
          <Checkbox
            id="hipertension"
            checked={newPatient.Hipertension === 1}
            onChange={(e) =>
              setNewPatient({ ...newPatient, Hipertension: e.checked ? 1 : 0 })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="diabetes">Diabetes</label>
          <Checkbox
            id="diabetes"
            checked={newPatient.Diabetes === 1}
            onChange={(e) =>
              setNewPatient({ ...newPatient, Diabetes: e.checked ? 1 : 0 })
            }
          />
        </div>

        <div className="p-field">
          <label htmlFor="smsReceived">SMS Received</label>
          <Checkbox
            id="smsReceived"
            checked={newPatient.SMS_received === 1}
            onChange={(e) =>
              setNewPatient({ ...newPatient, SMS_received: e.checked ? 1 : 0 })
            }
          />
        </div>

        <div className="p-field">
          <label htmlFor="noShow">No-show</label>
          <Dropdown
            id="noShow"
            value={newPatient["No-show"]}
            options={yesNoOptions}
            onChange={(e) => handleDropdownChange(e, "No-show")}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default AddPatient;
