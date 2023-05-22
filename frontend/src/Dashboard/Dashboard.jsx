import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Header from '../components/Header';
import Last20Table from '../components/Last20Table';
import Last20alc from '../components/Last20alc';
import Last20hyper from '../components/Last20hyper';
import Last20dia from '../components/Last20dia';
import Last20handi from '../components/Last20handi';
import UpdatePatient from '../components/UpdatePatient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers, faHeartbeat, faTint, faWheelchair, faSyncAlt } from '@fortawesome/free-solid-svg-icons';



function Dashboard() {
  const [id, setId] = useState('');
  const [info, setInfo] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLast20alc, setShowLast20alc] = useState(false);
  const [showLast20hyper, setShowLast20hyper] = useState(false);
  const [showLast20dia, setShowLast20dia] = useState(false);
  const [showLast20handi, setShowLast20handi] = useState(false);
  const [showLast20Table, setShowLast20Table] = useState(true);



  const handleSearch = async () => {
    const response = await fetch(`http://0.0.0.0:3000/getInfo?id=${id}`);
    const data = await response.json();
    setInfo(data);
    setShowResult(true); // Show the search result
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

  const handleCloseResult = () => {
    setShowResult(false);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://0.0.0.0:3000/deletePatient?id=${id}`);
    const data = await response.json();
    console.log(data); // add this line
    setInfo(null);
    setDeleteSuccess(true);
  };

  const handleLast20alcClick = () => {
    setShowLast20handi(false);
    setShowLast20Table(false);
    setShowLast20alc(true);
    setShowLast20hyper(false);
    setShowLast20dia(false);
  };

  const handleLast20hyperClick = () => {
    setShowLast20handi(false);
    setShowLast20Table(false);
    setShowLast20alc(false);
    setShowLast20hyper(true);
    setShowLast20dia(false);
  };

  const handleLast20diaClick = () => {
    setShowLast20handi(false);
    setShowLast20Table(false);
    setShowLast20alc(false);
    setShowLast20hyper(false);
    setShowLast20dia(true);
  };

  const handleLast20handiClick = () => {
    setShowLast20handi(true);
    setShowLast20Table(false);
    setShowLast20alc(false);
    setShowLast20hyper(false);
    setShowLast20dia(false);
  };

  const handleLast20recentClick = () => {
    setShowLast20handi(false);
    setShowLast20Table(true);
    setShowLast20alc(false);
    setShowLast20hyper(false);
    setShowLast20dia(false);
  };

  return (
    <div className="Dashboard">
      <Header onAdd={handleAdd} />
      <div className="button-bar" style={{ border: '1px solid black', padding: '10px' }}>
  <h5>Filter Patient</h5>
  <Button
    label={<>
      <FontAwesomeIcon icon={faGlassCheers} style={{ marginRight: '5px' }} />
      Alcoholism
    </>}
    onClick={handleLast20alcClick}
    style={{ backgroundColor: '#BF616A', color: 'white', marginBottom: '10px' }}
  />
  <Button
    label={<>
      <FontAwesomeIcon icon={faHeartbeat} style={{ marginRight: '5px' }} />
      Hypertension
    </>}
    onClick={handleLast20hyperClick}
    style={{ backgroundColor: '#D08770', color: 'white', marginBottom: '10px' }}
  />
  <Button
    label={<>
      <FontAwesomeIcon icon={faTint} style={{ marginRight: '5px' }} />
      Diabetes
    </>}
    onClick={handleLast20diaClick}
    style={{ backgroundColor: '#EBCB8B', color: 'white', marginBottom: '10px' }}
  />
  <Button
    label={<>
      <FontAwesomeIcon icon={faWheelchair} style={{ marginRight: '5px' }} />
      Handicap
    </>}
    onClick={handleLast20handiClick}
    style={{ backgroundColor: '#A3BE8C', color: 'white', marginBottom: '10px' }}
  />
  <Button
    label={<>
      <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
      Reload
    </>}
    onClick={handleLast20recentClick}
    style={{ backgroundColor: '#B48EAD', color: 'white', marginBottom: '10px' }}
  />
</div>
      <h4>Search Patient by ID</h4>
      <div className="p-inputgroup">
        <InputText value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
        <Button label="Search" onClick={handleSearch} />
      </div>
      {showResult && (
        <>
          {info && <DisplayInfo info={info} />}
          <div className="p-inputgroup">
            <Button label="Update" onClick={() => setShowUpdate(true)} />
            <Button label="Delete" onClick={handleDelete} className="p-button-danger" />
            <Button label="Close" onClick={handleCloseResult} className="p-button-secondary" />
          </div>
        </>
      )}
      {updateSuccess && <p style={{ color: 'green' }}>Patient record updated successfully.</p>}
      {deleteSuccess && <p style={{ color: 'green' }}>Patient record deleted successfully.</p>}
      <UpdatePatient
        info={info}
        visible={showUpdate}
        onHide={() => setShowUpdate(false)}
        onSubmit={handleUpdate}
      />
      {showLast20Table && <Last20Table reload={showLast20Table} />}
      {showLast20alc && <Last20alc visible={showLast20alc} onClose={() => setShowLast20alc(false)} />}
      {showLast20hyper && <Last20hyper visible={showLast20hyper} onClose={() => setShowLast20hyper(false)} />}
      {showLast20dia && <Last20dia visible={showLast20dia} onClose={() => setShowLast20dia(false)} />}
      {showLast20handi && <Last20handi visible={showLast20handi} onClose={() => setShowLast20handi(false)} />}
      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
      <p>&copy; 2023 LionJet. All rights reserved.</p>
    </footer>
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
    { field: 'Scholarship', value: info.Scholarship === 0 ? 'No' : 'Yes' },
    { field: 'Alcoholism', value: info.Alcoholism === 0 ? 'No' : 'Yes' },
    { field: 'Handcap', value: info.Handcap === 0 ? 'No' : 'Yes' },
    { field: 'Hipertension', value: info.Hipertension === 0 ? 'No' : 'Yes' },
    { field: 'Diabetes', value: info.Diabetes === 0 ? 'No' : 'Yes' },
    { field: 'SMS Received', value: info.SMS_received === 0 ? 'No' : 'Yes' },
    { field: 'No-show', value: info['No-show'] === 0 ? 'No' : 'Yes' }
  ];

  return (
    <div className="datatable-demo">
      <DataTable value={data}>
        <Column field="field" header="Field" />
        <Column field="value" header="Value" />
      </DataTable>
    </div>
  );
}

export default Dashboard;
