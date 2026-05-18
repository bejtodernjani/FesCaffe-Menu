import styles from './DesktopOverlay.module.css'

export default function DesktopOverlay() {
  return (
    <div className={styles.overlay}>
      <img
        src="/progress_pic.png"
        alt="Desktop version coming soon"
        className={styles.img}
      />
    </div>
  )
}
