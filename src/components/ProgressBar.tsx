import styled from "styled-components";
import { ProgressBarProps } from "../interfaces";
import ProgressBarItem from "./ProgressBarItem";

const ProgressBarContainer = styled.div`
  display: flex;
  height: 2px;
  top: 12px;
  gap: 4px;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 10;
  position: relative;
`;

export default function ProgressBar({
  progress,
  activeStoryIndex,
  storiesCount,
}: ProgressBarProps) {
  return (
    <ProgressBarContainer>
      {storiesCount.map((_, index) => (
        <div
          style={{
            width: `calc(100% / ${storiesCount.length})`,
            position: "relative",
          }}
        >
          <ProgressBarItem
            progress={progress}
            activeStoryIndex={activeStoryIndex}
            storyIndex={index}
          ></ProgressBarItem>
        </div>
      ))}
    </ProgressBarContainer>
  );
}
