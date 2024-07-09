import Slide from "./Slide";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SwiperCore from "swiper";
import { Data } from "../interfaces";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Slider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [slides, setSlides] = useState<Data[]>();

  const nextSlideHandle = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const prevSlideHandle = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const fetchData = useMemo(
    () => async () => {
      try {
        const res = await fetch("http://localhost:3000/data");
        if (!res.ok) throw new Error("Error");
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Swiper
      className="my-swiper"
      breakpoints={{
        340: {
          spaceBetween: 62,
          slidesPerView: 1,
          centeredSlides: true,
        },

        1024: {
          spaceBetween: 62,
          slidesPerView: 3,
          centeredSlides: true,
        },

        1920: {
          spaceBetween: 36,
          slidesPerView: 5,
          centeredSlides: true,
        },
      }}
      allowTouchMove={false}
      onSlideChange={(swiper: SwiperClass) => {
        setActiveSlideIndex(swiper.activeIndex);
      }}
      onSwiper={(instance: SwiperClass) => {
        swiperRef.current = instance;
      }}
      style={{ width: "100%" }}
      modules={[Navigation, Autoplay]}
    >
      {slides?.map((slide, index) => (
        <SwiperSlide
          key={index}
          style={{ display: "flex", position: "relative", height: "100%" }}
          // onClick={() => {
          //   if (activeSlideIndex !== index) swiperRef.current?.slideTo(index);
          // }}
        >
          <Slide
            nextSlideHandle={nextSlideHandle}
            prevSlideHandle={prevSlideHandle}
            activeSlideIndex={activeSlideIndex}
            slideIndex={index}
            {...slide}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
