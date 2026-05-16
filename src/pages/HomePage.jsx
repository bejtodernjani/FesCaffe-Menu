import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.logoSection}>
        <p className={styles.welcomeText}>Welcome to</p>
        <img src="/Logo.png" alt="Fes Lounge & Café" className={styles.logo} />
      </div>

      <div className={styles.categories}>
        <button className={styles.categoryBtn} onClick={() => navigate('/category/drinks')}>
          <img src="/Drinks.png" alt="Drinks" />
        </button>

        <button className={styles.categoryBtn} onClick={() => navigate('/category/desserts')}>
          <img src="/Dessert.png" alt="Desserts" />
        </button>
      </div>

      <div className={styles.checkFoodWrapper}>
        <button className={styles.checkFoodBtn} onClick={() => navigate('/food')}>
          <img src="/Sign.png" alt="Check our food" />
        </button>
      </div>
    </div>
  )
}
