import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const Search = ({ formik }) => {
  return (
    <div className="search-container">
      <Form>
        <InputGroup>
          <Form.Control
            as="select"
            id="searchBy"
            value={formik.values.searchBy}
            onChange={formik.handleChange}
          >
            {/* <option value="name">Name</option> */}
            <option value="id">ID</option>
          </Form.Control>
          <FormControl
            id="searchValue"
            placeholder=" "
            value={formik.values.searchValue}
            onChange={formik.handleChange}
          />
        </InputGroup>
      </Form>
    </div>
  );
};

export default Search;
