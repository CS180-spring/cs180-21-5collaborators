import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import TableRow from "./TableRow";

const Table = ({ data, onView, onUpdate, onDelete }) => {
  return (
    <BootstrapTable striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            rowData={row}
            onView={onView}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </BootstrapTable>
  );
};

export default Table;
