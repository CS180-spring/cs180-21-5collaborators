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

function Dashboard() {
  const [id, setId] = useState('');
  const [info, setInfo] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleSearch = async () => {
    const response = await fetch(`http://0.0.0.0:3000/getInfo?id=${id}`);
    const data = await response.json();
    setInfo(data);
  };

  const handleUpdate = async () => {
    const newInfo = {};
    newInfo.name = prompt('Enter new name:', info.name);
    newInfo.age = prompt('Enter new age:', info.age);
    newInfo.appointID = prompt('Enter new appointment ID:', info.appointID);
    newInfo.gender = prompt('Enter new gender (M/F):', info.gender);
    newInfo.sched = prompt('Enter new schedule (1/2/3):', info.sched);
    newInfo.appDay = prompt('Enter new appointment day (1/2/3):', info.appDay);
    newInfo.neigh = prompt('Enter new neighborhood:', info.neigh);
    newInfo.scholar = prompt('Enter new scholar status (0/1):', info.scholar);
    newInfo.hyperTen = prompt('Enter new hypertension status (0/1):', info.hyperTen);
    newInfo.diabet = prompt('Enter new diabetes status (0/1):', info.diabet);
    newInfo.alch = prompt('Enter new alcoholism status (0/1):', info.alch);
    newInfo.handi = prompt('Enter new disability status (0/1):', info.handi);
    newInfo.sms = prompt('Enter new SMS reminder status (0/1):', info.sms);
    newInfo.ns = prompt('Enter new notification status (yes/no):', info.ns);

    const response = await fetch(`http://0.0.0.0:3000/updatePatient?newName=${newInfo.name}&newAge=${newInfo.age}&id=${id}&newAppointID=${newInfo.appointID}&newGend=${newInfo.gender}&newSched=${newInfo.sched}&newAppDay=${newInfo.appDay}&newNeigh=${newInfo.neigh}&scholar=${newInfo.scholar}&hyperTen=${newInfo.hyperTen}&diabet=${newInfo.diabet}&alch=${newInfo.alch}&handi=${newInfo.handi}&sms=${newInfo.sms}&ns=${newInfo.ns}`);
    const data = await response.json();
    setInfo(data);
    setUpdateSuccess(true);
  };
  
  const handleDelete = async () => {
    const response = await fetch(`http://0.0.0.0:3000/deletePatient?id=${id}`);
    const data = await response.json();
    console.log(data); // add this line
    setInfo(null);
    setDeleteSuccess(true);
  };  

  const handleAdd = () => {
    console.log("Add new item");
  };

  const handleReload = () => {
  };

  return (
    <div className="Dashboard">
      <Header onAdd={handleAdd} onReload={handleReload} />
      <h2>Search by ID</h2>
      <div className="p-inputgroup">
        <InputText value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
        <Button label="Search" onClick={handleSearch} />
      </div>
      {info && <DisplayInfo info={info} />}
      {updateSuccess && <p style={{ color: 'green' }}>Patient record updated successfully.</p>}
      {deleteSuccess && <p style={{ color: 'green' }}>Patient record deleted successfully.</p>}
      {info && (
        <div className="p-inputgroup">
          <Button label="Update" onClick={handleUpdate} />
          <Button label="Delete" onClick={handleDelete} className="p-button-danger" />
        </div>
      )}
    </div>
  );
}

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
    <Card title="Information">
      <DataTable value={data}>
        <Column field="field" header="Field" />
        <Column field="value" header="Value" />
      </DataTable>
    </Card>
  );
};


export default Dashboard;