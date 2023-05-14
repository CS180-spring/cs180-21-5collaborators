import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

const AddPatientModal = ({ visible, onHide, onAdd }) => {
  const emptyPatient = {
    PatientName: '',
    Age: '',
    AppointmentID: '',
    Gender: '',
    ScheduledDay: '',
    AppointmentDay: '',
    Neighbourhood: '',
    Scholarship: '',
    Hipertension: '',
    Diabetes: '',
    Alcoholism: '',
    Handcap: '',
    SMS_received: '',
    'No-show': '',
  };

  const [newPatient, setNewPatient] = useState(emptyPatient);

  const genderOptions = [
    { label: 'M', value: 'M' },
    { label: 'F', value: 'F' },
  ];

  const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
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
    onAdd(newPatient);
    setNewPatient(emptyPatient);
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
      style={{ width: '50vw' }}
    >
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="patientName">Patient Name</label>
          <InputText
            id="patientName"
            value={newPatient.PatientName}
            onChange={(e) => handleInputChange(e, 'PatientName')}
          />
        </div>
        <div className="p-field">
          <label htmlFor="age">Age</label>
          <InputNumber
            id="age"
            value={newPatient.Age}
            onValueChange={(e) => handleNumberChange(e, 'Age')}
            integeronly
          />
        </div>
        <div className="p-field">
          <label htmlFor="gender">Gender</label>
          <Dropdown
            id="gender"
            value={newPatient.Gender}
            options={genderOptions}
            onChange={(e) => handleDropdownChange(e, 'Gender')}
          />
        </div>
        <div className="p-field">
          <label htmlFor="neighbourhood">Neighbourhood</label>
          <InputText
            id="neighbourhood"
            value={newPatient.Neighbourhood}
            onChange={(e) => handleInputChange(e, 'Neighbourhood')}
            />
            </div>
            <div className="p-field">
              <label htmlFor="appointmentID">Appointment ID</label>
              <InputText
                id="appointmentID"
                value={newPatient.AppointmentID}
                onChange={(e) => handleInputChange(e, 'AppointmentID')}
              />
            </div>
            <div className="p-field">
              <label htmlFor="appointmentDay">Appointment Day</label>
              <InputText
                id="appointmentDay"
                value={newPatient.AppointmentDay}
                onChange={(e) => handleInputChange(e, 'AppointmentDay')}
              />
            </div>
            <div className="p-field">
              <label htmlFor="scheduledDay">Scheduled Day</label>
              <InputText
                id="scheduledDay"
                value={newPatient.ScheduledDay}
                onChange={(e) => handleInputChange(e, 'ScheduledDay')}
              />
            </div>
            <div className="p-field">
              <label htmlFor="scholarship">Scholarship</label>
              <InputNumber
                id="scholarship"
                value={newPatient.Scholarship}
                onValueChange={(e) => handleNumberChange(e, 'Scholarship')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="alcoholism">Alcoholism</label>
              <InputNumber
                id="alcoholism"
                value={newPatient.Alcoholism}
                onValueChange={(e) => handleNumberChange(e, 'Alcoholism')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="handcap">Handcap</label>
              <InputNumber
                id="handcap"
                value={newPatient.Handcap}
                onValueChange={(e) => handleNumberChange(e, 'Handcap')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="hipertension">Hipertension</label>
              <InputNumber
                id="hipertension"
                value={newPatient.Hipertension}
                onValueChange={(e) => handleNumberChange(e, 'Hipertension')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="diabetes">Diabetes</label>
              <InputNumber
                id="diabetes"
                value={newPatient.Diabetes}
                onValueChange={(e) => handleNumberChange(e, 'Diabetes')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="smsReceived">SMS Received</label>
              <InputNumber
                id="smsReceived"
                value={newPatient.SMS_received}
                onValueChange={(e) => handleNumberChange(e, 'SMS_received')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="noShow">No-show</label>
              <Dropdown
                id="noShow"
                value={newPatient['No-show']}
                options={yesNoOptions}
                onChange={(e) => handleDropdownChange(e, 'No-show')}
              />
            </div>
          </div>
    </Dialog>
  );
};

export default AddPatientModal;
