import React, { useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import CardComponent from "./Card";

export default function SearchResults(props) {
  const { results, selectedPrices, onPriceFilterChange } = props;

  let [filterVisible, setFilterVisible] = useState(false); // State filter

  const handlePriceChange = (price) => {
    const updatedPrices = [...selectedPrices];
    if (updatedPrices.includes(price)) {
      updatedPrices.splice(updatedPrices.indexOf(price), 1);
    } else {
      updatedPrices.push(price);
    }
    onPriceFilterChange(updatedPrices);
  };

  if (results.length > 0 && !filterVisible) {
    setFilterVisible(true);
  }

  return (
    <Row>
      {filterVisible && (
        <Col md={4}>
          <Card className="py-4 px-4 mb-4">
            <h4>Filter Harga</h4>
            <div className="line-yellow mb-4" />
            <Form className="text-start">
              <Form.Check
                type="checkbox"
                id="price1"
                label="$ - Murah"
                checked={selectedPrices.includes("1")}
                onChange={() => handlePriceChange("1")}
              />
              <Form.Check
                type="checkbox"
                id="price2"
                label="$$ - Sedang"
                checked={selectedPrices.includes("2")}
                onChange={() => handlePriceChange("2")}
              />
              <Form.Check
                type="checkbox"
                id="price3"
                label="$$$ - Mahal"
                checked={selectedPrices.includes("3")}
                onChange={() => handlePriceChange("3")}
              />
              <Form.Check
                type="checkbox"
                id="price4"
                label="$$$$ - Sangat Mahal"
                checked={selectedPrices.includes("4")}
                onChange={() => handlePriceChange("4")}
              />
            </Form>
          </Card>
        </Col>
      )}
      <Col md={filterVisible ? 8 : 12}>
        <Row>
          <CardComponent results={results} selectedPrices={selectedPrices} />
        </Row>
      </Col>
    </Row>
  );
}
