import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Container } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function CarouselComponent(props) {
  const { result } = props;
  return (
    <>
      <Container className="py-5">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          autoplay={{ delay: 2000 }}
        >
          {result.photos.map((image, index) => (
            <>
              <SwiperSlide key={index}>
                <img src={image} alt={`Gambar ${index + 1}`} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={image} alt={`Gambar ${index + 1}`} />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </Container>
    </>
  );
}
