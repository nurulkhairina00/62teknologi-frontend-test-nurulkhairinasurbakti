import React, { useState } from "react";
import { Row, Col, InputGroup, Form, Button, Container } from "react-bootstrap";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader component from react-spinners

export default function SearchBar(props) {
  const { onSearch } = props;
  let [term, setTerm] = useState(""); // State term
  let [location, setLocation] = useState(""); // State location
  let [loading, setLoading] = useState(false); // State loading

  // Search berdasarkan term dan location
  const handleSearch = async () => {
    setLoading(true);
    try {
      await onSearch({ term, location });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="search-bar-container py-5">
        <h1 className="py-5">
          Business <span class="yellow-text">Search</span>
        </h1>
        <Form>
          <Row>
            <Col xs={12} md={6} lg={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Keyword</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={6} lg={5}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Location</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={12} lg={2}>
              <Button
                className="btn btn-submit mb-3 me-3"
                onClick={handleSearch}
              >
                Search
              </Button>
              {loading && (
                <div className="loading-indicator">
                  <ClipLoader size={50} color={"#007bff"} loading={loading} />
                </div>
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
