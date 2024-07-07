import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ProgressBarItemProps } from "../interfaces";
import { debounce } from "lodash";

const ItemContainer = styled.div<{ progress: number }>`
  transition: margin-right 50s;
  & > .barProgress {
    content: "";
    background-color: white;
    position: relative;
    height: 100%;
    right: 100%;
  }
  &.isPrev > .barProgress {
    transition: unset;
    right: 0px;
  }

  &.isNext > .barProgress {
    transition: unset;
    right: 100%;
  }

  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 2px;
  background-color: gray;
  z-index: 15;
`;

export default function ProgressBarItem({
  progress,
  activeStoryIndex,
  storyIndex,
}: ProgressBarItemProps) {
  const barItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barItemRef.current && activeStoryIndex === storyIndex) {
      barItemRef.current.style.right = "100%";
      const subscribe = debounce(() => {
        if (barItemRef.current) {
          barItemRef.current.style.transition = `right ${
            progress / 1000
          }s linear`;

          barItemRef.current.style.right = "0";
        }
      }, 50);
      subscribe();
      return () => {
        subscribe.cancel();
        if (barItemRef.current && activeStoryIndex === storyIndex) {
          barItemRef.current.style.transition = `unset`;
        }
      };
    } else if (barItemRef.current && storyIndex > activeStoryIndex) {
      barItemRef.current.style.transition = "unset";
      barItemRef.current.style.right = "100%";
    }
  }, [activeStoryIndex, progress, barItemRef.current]);

  return (
    <ItemContainer
      progress={progress}
      className={
        storyIndex === activeStoryIndex
          ? "isActive"
          : storyIndex < activeStoryIndex
          ? "isPrev"
          : "isNext"
      }
    >
      <div ref={barItemRef} className="barProgress"></div>
    </ItemContainer>
  );
}
