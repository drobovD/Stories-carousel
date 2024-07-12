import { HeaderProps } from "../../interfaces";
import styles from "./Header.module.scss";

export default function Header({
  soundImg,
  closeImg,
  soundWidth,
  soundHeight,
  closeSize,
}: HeaderProps) {
  return (
    <div className={styles.header_container}>
      <div className={styles.button_style}>
        <img
          src={soundImg}
          alt="Sound"
          width={soundWidth}
          height={soundHeight}
        />
      </div>
      <div className={styles.button_style}>
        <img src={closeImg} alt="Close" width={closeSize} height={closeSize} />
      </div>
    </div>
  );
}
