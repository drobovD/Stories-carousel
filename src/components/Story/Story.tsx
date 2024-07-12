import { useEffect, useRef, useState } from "react";
import { ExtendedStoryProps } from "../../interfaces";
import { useResizeDetector } from "react-resize-detector";
import Labels from "../Labels/Labels";
import styles from "./Story.module.scss";

export default function Story({
  swiperRef,
  action,
  slideIndex,
  activeSlideIndex,
  storyIndex,
  activeStoryIndex,
  setDelay,
  storiesLength,
  nextSlideHandle,
  prevSlideHandle,
}: ExtendedStoryProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (slideIndex === activeSlideIndex) {
      if (storyIndex === activeStoryIndex) {
        if (action.storyUrl.includes(".mp4")) {
          setDelay(videoRef.current ? videoRef.current?.duration * 1000 : 5000);
          videoRef.current?.play();
          if (videoRef.current) videoRef.current.muted = false;
        } else {
          setDelay(5000);
        }
      } else {
        if (videoRef.current) {
          videoRef.current?.pause();
          videoRef.current.currentTime = 0;
        }
      }
    }
    return () => {
      if (videoRef.current) {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [
    videoRef.current,
    activeStoryIndex,
    setDelay,
    storyIndex,
    slideIndex,
    activeSlideIndex,
  ]);

  const storyContainer = useRef<HTMLDivElement>(null);

  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (storyContainer.current)
      setRatio(storyContainer.current?.clientWidth / 440);
  }, [storyContainer.current]);

  useResizeDetector({
    targetRef: storyContainer,
    onResize: ({ width }) =>
      setRatio(storyContainer.current && width ? width / 440 : 1),
  });

  return (
    <div className={styles.story}>
      <div
        className={styles.on_prev_story}
        onClick={() => {
          swiperRef.current?.slidePrev();
          if (activeStoryIndex === 0) {
            swiperRef.current?.autoplay.pause();
            prevSlideHandle();
          }
        }}
      ></div>
      <div className={styles.story_image} ref={storyContainer}>
        {action.storyUrl.includes(".mp4") ? (
          <video
            className={styles.action}
            ref={videoRef}
            src={action.storyUrl}
            muted
            width={"100%"}
            height={"100%"}
          />
        ) : (
          <img
            className={`${styles.action} ${styles.img}`}
            src={action.storyUrl}
            alt="Story"
            width={"100%"}
            height={"100%"}
          />
        )}
      </div>
      <div
        className={styles.on_next_story}
        onClick={() => {
          swiperRef.current?.slideNext();
          if (activeStoryIndex === storiesLength - 1) {
            nextSlideHandle();
          }
        }}
      ></div>

      {action.labels.map((slide) => (
        <Labels
          key={slide.name}
          name={slide.name}
          x={slide.x * ratio}
          y={slide.y * ratio}
          link={slide.link}
        />
      ))}
    </div>
  );
}
