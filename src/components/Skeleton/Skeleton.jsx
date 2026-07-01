import styles from './Skeleton.module.css';

export default function Skeleton({ w = '100%', h = 14, r = 6, style = {} }) {
  return <div className={styles.skeleton} style={{ width: w, height: h, borderRadius: r, ...style }} />;
}
