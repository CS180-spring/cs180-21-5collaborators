import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

const UpdatePatient = ({ info, visible, onHide, onSubmit }) => {
  const getInitialInfo = () => {
    return info || {
      PatientId: '',
      PatientName: '',
      Age: '',
      Gender: '',
      Neighbourhood: '',
      AppointmentID: '',
      AppointmentDay: '',
      ScheduledDay: '',
      Scholarship: '',
      Alcoholism: '',
      Handcap: '',
      Hipertension: '',
      Diabetes: '',
      SMS_received: '',
      'No-show': '',
    };
  };

  const [updatedInfo, setUpdatedInfo] = useState(getInitialInfo());

  useEffect(() => {
    setUpdatedInfo(getInitialInfo());
  }, [info]);

  const genderOptions = [
    { label: 'M', value: 'M' },
    { label: 'F', value: 'F' },
  ];

  const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const handleInputChange = (e, field) => {
    setUpdatedInfo({ ...updatedInfo, [field]: e.target.value });
  };

  const handleDropdownChange = (e, field) => {
    setUpdatedInfo({ ...updatedInfo, [field]: e.value });
  };

  const handleNumberChange = (e, field) => {
    setUpdatedInfo({ ...updatedInfo, [field]: e.value });
  };

  const handleSubmit = () => {
    onSubmit(updatedInfo);
  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Cancel" icon="pi pi-times" onClick={onHide} />
        <Button label="Save" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    );
  };

  return (
    <Dialog
      header="Update Patient Information"
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
            value={updatedInfo.PatientName}
            onChange={(e) => handleInputChange(e, 'PatientName')}
          />
        </div>
        <div className="p-field">
          <label htmlFor="age">Age</label>
          <InputNumber
            id="age"
            value={updatedInfo.Age}
            onValueChange={(e) => handleNumberChange(e, 'Age')}
            integeronly
          />
        </div>
        <div className="p-field">
          <label htmlFor="gender">Gender</label>
          <Dropdown
            id="gender"
            value={updatedInfo.Gender}
            options={genderOptions}
            onChange={(e) => handleDropdownChange(e, 'Gender')}
          />
        </div>
        <div className="p-field">
          <label htmlFor="neighbourhood">Neighbourhood</label>
          <InputText
            id="neighbourhood"
            value={updatedInfo.Neighbourhood}
            onChange={(e) => handleInputChange(e, 'Neighbourhood')}
            />
            </div>
            <div className="p-field">
              <label htmlFor="appointmentID">Appointment ID</label>
              <InputText
                id="appointmentID"
                value={updatedInfo.AppointmentID}
                onChange={(e) => handleInputChange(e, 'AppointmentID')}
              />
            </div>
            <div className="p-field">
              <label htmlFor="appointmentDay">Appointment Day</label>
              <InputText
                id="appointmentDay"
                value={updatedInfo.AppointmentDay}
                onChange={(e) => handleInputChange(e, 'AppointmentDay')}
              />
            </div>
            <div className="p-field">
              <label htmlFor="scheduledDay">Scheduled Day</label>
              <InputText
                id="scheduledDay"
                value={updatedInfo.ScheduledDay}
                onChange={(e) => handleInputChange(e, 'ScheduledDay')}
              />
            </div>
            <div className="p-field">
              <label htmlFor="scholarship">Scholarship</label>
              <InputNumber
                id="scholarship"
                value={updatedInfo.Scholarship}
                onValueChange={(e) => handleNumberChange(e, 'Scholarship')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="alcoholism">Alcoholism</label>
              <InputNumber
                id="alcoholism"
                value={updatedInfo.Alcoholism}
                onValueChange={(e) => handleNumberChange(e, 'Alcoholism')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="handcap">Handcap</label>
              <InputNumber
                id="handcap"
                value={updatedInfo.Handcap}
                onValueChange={(e) => handleNumberChange(e, 'Handcap')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="hipertension">Hipertension</label>
              <InputNumber
                id="hipertension"
                value={updatedInfo.Hipertension}
                onValueChange={(e) => handleNumberChange(e, 'Hipertension')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="diabetes">Diabetes</label>
              <InputNumber
                id="diabetes"
                value={updatedInfo.Diabetes}
                onValueChange={(e) => handleNumberChange(e, 'Diabetes')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="smsReceived">SMS Received</label>
              <InputNumber
                id="smsReceived"
                value={updatedInfo.SMS_received}
                onValueChange={(e) => handleNumberChange(e, 'SMS_received')}
                integeronly
              />
            </div>
            <div className="p-field">
              <label htmlFor="noShow">No-show</label>
              <Dropdown
                id="noShow"
                value={updatedInfo['No-show']}
                options={yesNoOptions}
                onChange={(e) => handleDropdownChange(e, 'No-show')}
              />
            </div>
          </div>
        </Dialog>
      );
    };
    
    export default UpdatePatient;
    