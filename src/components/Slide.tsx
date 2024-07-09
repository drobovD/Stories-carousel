import { SlideProps } from "../interfaces";
import styled from "styled-components";
import SlideHeader from "./SlideHeader";
import ProgressBar from "./ProgressBar";
import Story from "./Story";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import { debounce } from "lodash";
import sound from "../assets/Sound.svg";
import close from "../assets/Close.svg";
import SlideFooter from "./SlideFooter";

const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
`;

const SlideInner = styled.div<{ isActive: boolean }>`
  width: 352px;
  height: 625.78px;
  position: relative;

  @media (max-width: 1920px) {
    transform: ${(props) =>
      props.isActive ? "scale(1.41) !important" : "scale(1)"};
    @media (max-width: 1024px) {
      width: 340px;
      height: 591px;
      transform: scale(1) !important;
    }
  }
`;

const SlideHeaderWithBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 96px;
  gap: 6px;
  z-index: 5;
  position: absolute;
`;

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
    <SlideContainer>
      <SlideInner
        isActive={slideIndex === activeSlideIndex}
        style={{
          transform:
            slideIndex < activeSlideIndex
              ? "translateX(-85px)"
              : slideIndex > activeSlideIndex
              ? "translateX(85px)"
              : "scale(1.25)",
          transition: "transform 0.2s",
          opacity: slideIndex === activeSlideIndex ? "1" : "0.3",
        }}
      >
        <SlideHeaderWithBarContainer>
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
        </SlideHeaderWithBarContainer>
        <Swiper
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
          style={{ width: "100%", position: "relative" }}
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
      </SlideInner>
    </SlideContainer>
  );
}
