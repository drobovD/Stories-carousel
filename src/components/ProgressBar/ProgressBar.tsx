import { ProgressBarProps } from "../../interfaces";
import ProgressBarItem from "../ProgressBarItem/ProgressBarItem";
import styles from "./ProgressBar.module.scss";

export default function ProgressBar({
  progress,
  activeStoryIndex,
  storiesCount,
}: ProgressBarProps) {
  return (
    <div className={styles.progress_bar_container}>
      {storiesCount.map((_, index) => (
        <div
          className={styles.progress_bar_wrapper}
          key={index}
          style={{
            width: `calc(100% / ${storiesCount.length})`,
          }}
        >
          <ProgressBarItem
            progress={progress}
            activeStoryIndex={activeStoryIndex}
            storyIndex={index}
          ></ProgressBarItem>
        </div>
      ))}
    </div>
  );
}
