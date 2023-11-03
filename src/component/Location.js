import { Card, Container, Col, Row } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import Map from "./Map.js";

export default function MapsComponent(props) {
  const { result } = props;

  // Deklarasi days of week
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Fungsi format time
  const formatTime = (time) => {
    let hour = parseInt(time.slice(0, 2), 10);
    let minute = time.slice(2);
    let period = "AM";
    if (hour >= 12) {
      period = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }
    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  return (
    <>
      <div className="bg-white">
        <Container>
          <h1 className="pt-5 pb-2">
            Location <span class="yellow-text"> & Hours </span>
          </h1>
          <div className="line-yellow"></div>
          <div className="py-5">
            <Row>
              <Col sm={12} md={6} lg={8}>
                <Card>
                  <Map
                    latitude={result.coordinates.latitude}
                    longitude={result.coordinates.longitude}
                    rating={result.rating}
                    name={result.name}
                  />
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4} className="text-start">
                {result.hours[0].open.map((day, index) => (
                  <>
                    <Row>
                      <p className="col-3" key={index}>
                        {daysOfWeek[day.day]}
                      </p>
                      <p className="col-9">
                        {formatTime(day.start)} - {formatTime(day.end)}
                      </p>
                    </Row>
                  </>
                ))}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
