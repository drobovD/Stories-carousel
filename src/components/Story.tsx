import { useEffect, useRef, useState } from "react";
import { ExtendedStoryProps } from "../interfaces";
import { useResizeDetector } from "react-resize-detector";
import Labels from "./Labels";

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
    <div style={{ position: "relative" }}>
      <div
        style={{
          height: "100%",
          width: "25%",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "3",
        }}
        onClick={() => {
          swiperRef.current?.slidePrev();
          if (activeStoryIndex === 0) {
            swiperRef.current?.autoplay.pause();
            prevSlideHandle();
          }
        }}
      ></div>
      <div style={{ position: "relative" }} ref={storyContainer}>
        {action.storyUrl.includes(".mp4") ? (
          <video
            className="xs"
            ref={videoRef}
            style={{ aspectRatio: "9/16" }}
            src={action.storyUrl}
            muted
            width={"100%"}
            height={"100%"}
          />
        ) : (
          <img
            className="xs"
            style={{ aspectRatio: "9/16", objectFit: "cover" }}
            src={action.storyUrl}
            alt="Story"
            width={"100%"}
            height={"100%"}
          />
        )}
        <div
          style={{
            height: "100%",
            width: "75%",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 3,
          }}
          onClick={() => {
            swiperRef.current?.slideNext();
            if (activeStoryIndex === storiesLength - 1) {
              nextSlideHandle();
            }
          }}
        ></div>

        {action.labels.map((slide) => (
          <Labels
            name={slide.name}
            x={slide.x * ratio}
            y={slide.y * ratio}
            link={slide.link}
          />
        ))}
      </div>
    </div>
  );
}
