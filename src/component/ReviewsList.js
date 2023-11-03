import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { Card, Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewsList() {
  const { id } = useParams(); // Mengambil ID dari URL
  let [dataReviews, setDataReviews] = useState([]); // State data review

  // Get data review list
  useEffect(() => {
    axios
      .get(API_URL + `/v3/business/review/${id}`)
      .then((res) => {
        setDataReviews(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <Container>
        <h1 className="pt-5 pb-2">
          Reviews <span class="yellow-text">List</span>{" "}
        </h1>
        <div className="line-yellow"></div>
        <div className="py-5">
          {dataReviews &&
            dataReviews.map((item, index) => (
              <Card className="mb-3 py-3 card-business" key={index}>
                <Container>
                  <Row>
                    <Col lg={1} className="profile-image">
                      <img src={item.user.image_url} alt="Profile" />
                    </Col>
                    <Col lg={11} className="text-start">
                      <h4>
                        {item.user.name}{" "}
                        <small className="text-muted fs-14">
                          Posted on {item.time_created}
                        </small>
                      </h4>
                      <p>
                        {Array.from(
                          { length: Math.floor(item.rating) },
                          (v, i) => (
                            <FontAwesomeIcon
                              icon={faStar}
                              color="gold"
                              className="text-end"
                            />
                          )
                        )}
                        &nbsp;&nbsp;
                        <span className="fw-bold">{item.rating} </span>
                      </p>
                      <p>{item.text}</p>
                    </Col>
                  </Row>
                </Container>
              </Card>
            ))}
        </div>
      </Container>
    </>
  );
}
