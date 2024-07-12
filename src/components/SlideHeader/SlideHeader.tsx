import { SlideHeaderProps } from "../../interfaces";
import styles from "./SlideHeader.module.scss";

export default function SlideHeader({
  avatar,
  name,
  closeImg,
  closeSize,
}: SlideHeaderProps) {
  return (
    <div className={styles.slide_header_container}>
      <div className={styles.presentation_container}>
        <img className={styles.avatar_container} src={avatar} alt="Avatar" />
        <span>{name}</span>
      </div>
      <button className={styles.button_style}>
        <img src={closeImg} alt="Sound" width={closeSize} height={closeSize} />
      </button>
    </div>
  );
}
