import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

export default function BusinessDetail(props) {
  const { result } = props;
  return (
    <>
      <div className="bg-white">
        <Container>
          <h1 className="pt-5 pb-2">{result.name}</h1>
          <div className="line-yellow"></div>
          <Row className="py-5">
            <Col xs={12} md={6} lg={6} className="my-2">
              <Card>
                <Card.Img src={result.image_url}></Card.Img>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={6} className="my-3">
              <div className="text-start ">
                <h6>Categories</h6>
                <p>
                  {result.categories.map((category, i) => (
                    <Badge bg="secondary" key={i} className="mx-1">
                      {category.title}
                    </Badge>
                  ))}
                </p>
                <h6>Transactions</h6>
                <p>
                  {result.transactions.map((item, i) => (
                    <Badge bg="secondary" key={i} className="mx-1">
                      {item}
                    </Badge>
                  ))}
                </p>
                <h6>Price</h6>
                <p>{result.price}</p>
                <h6> Phone</h6>
                <p>{result.display_phone}</p>
                <h6>Address</h6>
                <p>{result.location.display_address}</p>
                <Button
                  variant={result.is_closed === true ? "danger" : "success"}
                >
                  {result.is_closed === true ? "Close" : "Open"}
                </Button>{" "}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
