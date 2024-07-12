import { SlideProps } from "../../interfaces";
import SlideHeader from "../SlideHeader/SlideHeader";
import ProgressBar from "../ProgressBar/ProgressBar";
import Story from "../Story/Story";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import { debounce } from "lodash";
import sound from "../../assets/Sound.svg";
import close from "../../assets/Close.svg";
import SlideFooter from "../SlideFooter/SlideFooter";
import styles from "./Slide.module.scss";

export default function Slide({
  avatar,
  name,
  stories,
  slideIndex,
  activeSlideIndex,
  nextSlideHandle,
  prevSlideHandle,
}: SlideProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [delay, setDelay] = useState(5000);

  useEffect(() => {
    if (slideIndex !== activeSlideIndex) {
      swiperRef.current?.disable();
    } else {
      swiperRef.current?.enable();
    }
  }, [activeSlideIndex, isPaused, swiperRef.current]);

  useEffect(() => {
    const subscribe = debounce(() => {
      if (activeStoryIndex === stories.length - 1) {
        swiperRef.current?.autoplay.pause();
        nextSlideHandle();
      } else {
        swiperRef.current?.slideNext();
      }
    }, delay);

    subscribe();

    return () => {
      subscribe.cancel();
    };
  }, [activeStoryIndex, swiperRef.current, delay]);

  return (
    <div
      className={
        slideIndex === activeSlideIndex
          ? `${styles.slide_container} ${styles.is_active}`
          : `${styles.slide_container} ${styles.is_not_active}`
      }
    >
      <div className={styles.slide_header_with_bar_container}>
        {activeSlideIndex === slideIndex && (
          <ProgressBar
            progress={delay}
            activeStoryIndex={activeStoryIndex}
            storiesCount={stories}
          />
        )}
        <SlideHeader
          avatar={avatar}
          name={name}
          closeImg={close}
          closeSize={`${16}px`}
        />
      </div>
      <Swiper
        className={styles.story_slider}
        onBeforeInit={(swiper: SwiperClass) => {
          if (slideIndex !== activeSlideIndex) {
            swiper.disable();
          }
        }}
        onSlideChange={(swiper: SwiperClass) => {
          setActiveStoryIndex(swiper.activeIndex);
        }}
        onSwiper={(instance: SwiperClass) => {
          swiperRef.current = instance;
        }}
        slidesPerView={1}
        allowTouchMove={false}
      >
        {stories.map((story, index) => (
          <SwiperSlide key={story.id}>
            <Story
              setDelay={setDelay}
              swiperRef={swiperRef}
              action={story}
              slideIndex={slideIndex}
              activeSlideIndex={activeSlideIndex}
              storyIndex={index}
              activeStoryIndex={activeStoryIndex}
              storiesLength={stories.length}
              prevSlideHandle={prevSlideHandle}
              nextSlideHandle={nextSlideHandle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SlideFooter
        soundImg={sound}
        soundWidth={`${12.26}px`}
        soundHeight={`${20}px`}
      />
    </div>
  );
}
