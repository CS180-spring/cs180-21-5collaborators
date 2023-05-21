import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const Last20alc = ({ visible, onClose }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetch("http://0.0.0.0:3000/last20Alc")
      .then((response) => response.json())
      .then((data) => setPatients(data));
  }, []);

  const openDialog = (patient) => {
    setSelectedPatient(patient);
  };

  const closeDialog = () => {
    setSelectedPatient(null);
  };

  const viewTemplate = (rowData) => {
    return (
      <Button
        label="View"
        icon="pi pi-eye"
        onClick={() => openDialog(rowData)}
        className="p-button-text"
      />
    );
  };

  return (
    <div>
      <h3>Alcoholic patients</h3>
      <DataTable value={patients}>
        <Column field="PatientId" header="Patient ID" />
        <Column field="PatientName" header="Patient Name" />
        <Column field="Age" header="Age" />
        <Column body={viewTemplate} style={{ textAlign: "center", width: "8rem" }} />
      </DataTable>

      <Dialog
        visible={!!selectedPatient}
        onHide={closeDialog}
        header="Patient Details"
        modal
        style={{ width: "30rem" }}
      >
        {selectedPatient && (
          <div>
            <p><strong>Patient ID:</strong> {selectedPatient.PatientId}</p>
            <p><strong>Patient Name:</strong> {selectedPatient.PatientName}</p>
            <p><strong>Appointment ID:</strong> {selectedPatient.AppointmentID}</p>
            <p><strong>Gender:</strong> {selectedPatient.Gender}</p>
            <p><strong>Scheduled Day:</strong> {selectedPatient.ScheduledDay}</p>
            <p><strong>Appointment Day:</strong> {selectedPatient.AppointmentDay}</p>
            <p><strong>Age:</strong> {selectedPatient.Age}</p>
            <p><strong>Neighbourhood:</strong> {selectedPatient.Neighbourhood}</p>
            <p><strong>Scholarship:</strong> {selectedPatient.Scholarship ? "Yes" : "No"}</p>
            <p><strong>Hypertension:</strong> {selectedPatient.Hipertension ? "Yes" : "No"}</p>
            <p><strong>Diabetes:</strong> {selectedPatient.Diabetes ? "Yes" : "No"}</p>
            <p><strong>Alcoholism:</strong> {selectedPatient.Alcoholism ? "Yes" : "No"}</p>
            <p><strong>Handicap:</strong> {selectedPatient.Handcap ? "Yes" : "No"}</p>
            <p><strong>SMS Received:</strong> {selectedPatient.SMS_received ? "Yes" : "No"}</p>
            <p><strong>No-Show:</strong> {selectedPatient["No-show"]}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};
export default Last20alc;

