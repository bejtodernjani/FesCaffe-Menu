import { useState, useRef, useEffect } from 'react'
import styles from './Preloader.module.css'

export default function Preloader({ onDone }) {
  const [fading, setFading] = useState(false)
  const calledRef = useRef(false)

  function finish() {
    if (calledRef.current) return
    calledRef.current = true
    setFading(true)
    setTimeout(onDone, 600)
  }

  useEffect(() => {
    // Fallback: dismiss after 10s if video never loads or plays
    const timer = setTimeout(finish, 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${styles.overlay} ${fading ? styles.fading : ''}`}>
      <video
        className={styles.video}
        src="/coffeebrownPink.mp4"
        autoPlay
        muted
        playsInline
        onEnded={finish}
      />
    </div>
  )
}
