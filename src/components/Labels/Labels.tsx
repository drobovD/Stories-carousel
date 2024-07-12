import { Label } from "../../interfaces";
import styles from "./Labels.module.scss";

export default function Labels({ name, x, y, link }: Label) {
  return (
    <div
      className={styles.labels_container}
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <span className={styles.labels_wrapper}>
        <a className={styles.link_style} href={link}>
          {name}
        </a>
      </span>
    </div>
  );
}
