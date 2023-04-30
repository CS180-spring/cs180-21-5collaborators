import React from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const TableRow = ({ rowData, onView, onUpdate, onDelete }) => {
  return (
    <tr>
      <td>{rowData.id}</td>
      <td>{rowData.name}</td>
      <td>
        <Button variant="info" size="sm" onClick={() => onView(rowData.id)}>
          <FaEye />
        </Button>
        <Button
          variant="warning"
          size="sm"
          onClick={() => onUpdate(rowData.id)}
        >
          <FaEdit />
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(rowData.id)}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
