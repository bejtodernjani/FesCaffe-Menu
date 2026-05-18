import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} Fes Lounge & Café. All rights reserved.{' '}
        <span className={styles.divider}>|</span> Developed by Bejtulla Dernjani
      </p>
    </footer>
  )
}
