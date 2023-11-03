import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import CarouselComponent from "../component/Carousel";
import ReviewsList from "../component/ReviewsList";
import BusinessDetail from "../component/BusinessDetail";
import MapsComponent from "../component/Location";

export default function DetailPage() {
  const { id } = useParams(); // Mengambil ID dari URL
  let [dataDetail, setDataDetail] = useState(null); // State business detail

  // Get data business detail
  useEffect(() => {
    axios
      .get(API_URL + `/v3/business/detail/${id}`)
      .then((res) => {
        setDataDetail(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      {dataDetail ? (
        <>
          <Container className="pt-5">
            <div className=" bg-custom-yellow ">
              <Row>
                <Col xs={12}>
                  <Breadcrumb className="mt-3 mx-4">
                    <Breadcrumb.Item
                      className="custom-breadcrumb-item"
                      href="/"
                    >
                      Search
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      className="custom-breadcrumb-item"
                      href={`/detail-business/${id}`}
                    >
                      Detail Business
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
            </div>
          </Container>
          <CarouselComponent result={dataDetail} />
          <BusinessDetail result={dataDetail} />
          <ReviewsList />
          <MapsComponent result={dataDetail} />
        </>
      ) : (
        ""
      )}
    </>
  );
}
