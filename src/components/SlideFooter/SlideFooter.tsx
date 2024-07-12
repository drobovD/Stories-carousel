import { SlideFooterProps } from "../../interfaces";
import styles from "./SlideFooter.module.scss";

export default function SlideFooter({
  soundImg,
  soundWidth,
  soundHeight,
}: SlideFooterProps) {
  return (
    <div className={styles.slide_footer_container}>
      <button className={styles.button_style}>
        <img
          src={soundImg}
          alt={"Sound"}
          width={soundWidth}
          height={soundHeight}
        />
      </button>
      <button className={styles.button_style}>
        <img
          src={soundImg}
          alt={"Sound"}
          width={soundWidth}
          height={soundHeight}
        />
      </button>
    </div>
  );
}
