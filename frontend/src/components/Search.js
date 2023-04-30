import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const Search = ({ searchBy, setSearchBy, searchValue, setSearchValue }) => {
  return (
    <div className="search-container">
      <Form>
        <InputGroup>
          <Form.Control
            as="select"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="id">ID</option>
          </Form.Control>
          <FormControl
            placeholder=" "
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
      </Form>
    </div>
  );
};

export default Search;
