import { useEffect, useRef } from "react";
import { ProgressBarItemProps } from "../../interfaces";
import { debounce } from "lodash";
import styles from "./ProgressBarItem.module.scss";

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
    <div
      className={
        storyIndex === activeStoryIndex
          ? `${styles.item_container}`
          : storyIndex < activeStoryIndex
          ? `${styles.item_container} ${styles.is_prev}`
          : `${styles.item_container} ${styles.is_next}`
      }
    >
      <div ref={barItemRef} className={styles.bar_progress}></div>
    </div>
  );
}
