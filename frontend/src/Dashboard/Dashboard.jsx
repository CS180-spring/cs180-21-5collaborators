import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Header from "../components/Header";
import Last20Table from "../components/Last20Table";
import UpdatePatient from "../components/UpdatePatient";

function Dashboard() {
  const [id, setId] = useState('');
  const [info, setInfo] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleSearch = async () => {
    const response = await fetch(`http://0.0.0.0:3000/getInfo?id=${id}`);
    const data = await response.json();
    setInfo(data);
  };

  const handleUpdate = async (updatedInfo) => {
    const {
      PatientId,
      PatientName,
      Age,
      AppointmentID,
      Gender,
      ScheduledDay,
      AppointmentDay,
      Neighbourhood,
      Scholarship,
      Hipertension,
      Diabetes,
      Alcoholism,
      Handcap,
      SMS_received,
      'No-show': NoShow,
    } = updatedInfo;
  
    const queryString = new URLSearchParams({
      newName: PatientName,
      newAge: Age,
      id: PatientId,
      newAppointID: AppointmentID,
      newGend: Gender,
      newSched: ScheduledDay,
      newAppDay: AppointmentDay,
      newNeigh: Neighbourhood,
      scholar: Scholarship,
      hyperTen: Hipertension,
      diabet: Diabetes,
      alch: Alcoholism,
      handi: Handcap,
      sms: SMS_received,
      ns: NoShow,
    }).toString();
  
    try {
      const response = await fetch(`http://0.0.0.0:3000/updatePatient?${queryString}`);
      
      if (response.ok) {
        // Refresh the data or update the state with the new patient info
        console.log('Patient information updated successfully');
      } else {
        console.error('Failed to update patient information');
      }
    } catch (error) {
      console.error('Error updating patient information:', error);
    }
  };
  

  
  const handleDelete = async () => {
    const response = await fetch(`http://0.0.0.0:3000/deletePatient?id=${id}`);
    const data = await response.json();
    console.log(data); // add this line
    setInfo(null);
    setDeleteSuccess(true);
  };  

  const handleAdd = async (patient) => {
    const params = new URLSearchParams({
      newName: patient.PatientName,
      newAge: patient.Age,
      newAppointID: patient.AppointmentID,
      newGend: patient.Gender,
      newSched: patient.ScheduledDay,
      newAppDay: patient.AppointmentDay,
      newNeigh: patient.Neighbourhood,
      scholar: patient.Scholarship,
      hyperTen: patient.Hipertension,
      diabet: patient.Diabetes,
      alch: patient.Alcoholism,
      handi: patient.Handcap,
      sms: patient.SMS_received,
      ns: patient['No-show'],
    });
  
    const response = await fetch(`http://0.0.0.0:3000/addPatient?${params}`);
    const data = await response.json();
    console.log('Output:', data);
  };
  

  const handleReload = () => {
  };

  return (
    <div className="Dashboard">
      <Header onAdd={handleAdd} onReload={handleReload} />
      <h3>Search Patient by ID</h3>
      <div className="p-inputgroup">
        <InputText value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
        <Button label="Search" onClick={handleSearch} />
      </div>
      {info && <DisplayInfo info={info} />}
      {updateSuccess && <p style={{ color: 'green' }}>Patient record updated successfully.</p>}
      {deleteSuccess && <p style={{ color: 'green' }}>Patient record deleted successfully.</p>}
      {info && (
        <div className="p-inputgroup">
          <Button label="Update" onClick={() => setShowUpdate(true)} />
          <Button label="Delete" onClick={handleDelete} className="p-button-danger" />
        </div>
      )}
      <UpdatePatient
        info={info}
        visible={showUpdate}
        onHide={() => setShowUpdate(false)}
        onSubmit={handleUpdate}
      />
      {/*recent20Table component */}
      <h3>Recently added patients</h3>
      <Last20Table />
    </div>
  );
};

const DisplayInfo = ({ info }) => {
  if (info.error === "No patient found") {
    return <div>No patient found</div>;
  }

  const data = [
    { field: 'Patient ID', value: info.PatientId },
    { field: 'Patient Name', value: info.PatientName },
    { field: 'Age', value: info.Age },
    { field: 'Gender', value: info.Gender },
    { field: 'Neighbourhood', value: info.Neighbourhood },
    { field: 'Appointment ID', value: info.AppointmentID },
    { field: 'Appointment Day', value: info.AppointmentDay },
    { field: 'Scheduled Day', value: info.ScheduledDay },
    { field: 'Scholarship', value: info.Scholarship },
    { field: 'Alcoholism', value: info.Alcoholism },
    { field: 'Handcap', value: info.Handcap },
    { field: 'Hipertension', value: info.Hipertension },
    { field: 'Diabetes', value: info.Diabetes },
    { field: 'SMS Received', value: info.SMS_received },
    { field: 'No-show', value: info['No-show'] }
  ];

  return (
    <Card title="Patient Information">
      <DataTable value={data}>
        <Column field="field" header="Field" />
        <Column field="value" header="Value" />
      </DataTable>
    </Card>
  );
};


export default Dashboard;