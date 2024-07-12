import Slide from "../Slide/Slide";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SwiperCore from "swiper";
import { Data } from "../../interfaces";
import styles from "./Slider.module.scss";

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

  useEffect(() => {
    const fetchData = () => {
      fetch("data.json")
        .then((response) => response.json())
        .then((json) => setSlides(json.data));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Swiper
      className={styles.main_slider}
      breakpoints={{
        340: {
          slidesPerView: 1,
          centeredSlides: true,
        },

        1023: {
          slidesPerView: "auto",
          centeredSlides: true,
        },

        1919: {
          slidesPerView: "auto",
          centeredSlides: true,
        },
      }}
      onSlideChange={(swiper: SwiperClass) => {
        setActiveSlideIndex(swiper.activeIndex);
        swiper.updateSlides();
      }}
      onSwiper={(instance: SwiperClass) => {
        swiperRef.current = instance;
      }}
      modules={[Navigation, Autoplay]}
    >
      {slides?.map((slide, index) => (
        <SwiperSlide
          key={index}
          className={
            index === activeSlideIndex
              ? `${styles.main_slider_elem} ${styles.is_active}`
              : index - activeSlideIndex === 1
              ? `${styles.main_slider_elem} ${styles.is_next}`
              : activeSlideIndex - index === 1
              ? `${styles.main_slider_elem} ${styles.is_prev}`
              : `${styles.main_slider_elem} ${styles.is_not_active}`
          }
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
