import Lottie from 'lottie-react'
import maintainAnimation from '../../public/maintain.json'
import styles from './DesktopOverlay.module.css'

export default function DesktopOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <Lottie
          animationData={maintainAnimation}
          loop
          className={styles.animation}
        />
        <p className={styles.message}>
          Desktop mode is still in progress. In the meantime visit our link scanning this QR Code.
        </p>
        <div className={styles.qrPlaceholder}>
          {/* QR Code will go here */}
        </div>
      </div>
    </div>
  )
}
