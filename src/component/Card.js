import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Badge, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginationComponent from "./Pagination";

export default function CardComponent(props) {
  const { results, selectedPrices } = props;
  let [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 5;
  let priceMapping = {
    $: "1",
    $$: "2",
    $$$: "3",
    $$$$: "4",
  };

  // Fungsi untuk menghitung indeks awal dan akhir item yang ditampilkan
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  // Hitung jumlah halaman berdasarkan jumlah item dan jumlah item per halaman
  let totalItems = results.length;
  let pageNumbers = Math.ceil(totalItems / itemsPerPage);

  // Fungsi mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Menampilkan card data business
  const isBusinessPriceFiltered = (businessPrice) => {
    if (selectedPrices.length === 0) {
      return true;
    }
    const priceNumber = priceMapping[businessPrice];
    return selectedPrices.includes(priceNumber);
  };

  return (
    <>
      {currentItems.map(
        (result) =>
          isBusinessPriceFiltered(result.price) && (
            <Col key={result.id} md={12}>
              <Card className="card-business mb-4">
                <Row noGutters>
                  <Col md={4}>
                    <Card.Img
                      src={result.image_url}
                      alt={result.name}
                      style={{ height: "240px" }}
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="text-start">
                      <Card.Title>
                        {result.name}
                        <span>
                          <Badge
                            className="mx-2"
                            bg={
                              result.is_closed === true ? "danger" : "success"
                            }
                          >
                            {result.is_closed === true ? "Close" : "Open"}
                          </Badge>
                        </span>
                      </Card.Title>
                      <Card.Text className="my-2">
                        {Array.from(
                          { length: Math.floor(result.rating) },
                          (v, i) => (
                            <FontAwesomeIcon
                              icon={faStar}
                              color="gold"
                              className="text-end"
                            />
                          )
                        )}
                        &nbsp;&nbsp;
                        <span className="fw-bold">{result.rating}</span>
                        <small> ({result.review_count} reviews)</small>
                      </Card.Text>
                      <Card.Text className="my-2">
                        {result.categories.map((category, i) => (
                          <Badge bg="secondary" key={i} className="mx-1">
                            {category.title}
                          </Badge>
                        ))}
                      </Card.Text>
                      <Card.Text className="fs-14 mb-2">
                        Phone : {result.display_phone}
                      </Card.Text>
                      <Card.Text className="fs-14">
                        Address :{" "}
                        {result.location.address1 +
                          ", " +
                          result.location.city +
                          ", " +
                          result.location.zip_code}
                      </Card.Text>
                      <Card.Text className="text-end">
                        <Link
                          to={`/detail-business/${result.id}`}
                          className="text-end"
                        >
                          <Button className="btn btn-more">More Details</Button>
                        </Link>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          )
      )}
      {results.length > 0 && (
        <div className="d-flex justify-content-center">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={pageNumbers}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
