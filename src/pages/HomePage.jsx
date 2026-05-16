import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import styles from './HomePage.module.css'

const drinkCategories = [
  { name: 'drinks',   color: '#1a1a1a' },
  { name: 'desserts', color: '#1a1a1a' },
]

const foodCategories = [
  { name: 'breakfast', color: '#1a1a1a' },
  { name: 'pizza',     color: '#E8192C' },
  { name: 'lunch',     color: '#2D6A4F' },
  { name: 'salads',    color: '#E07B3A' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const foodRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    foodRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page}>

      {/* ── Section 1: Hero ── */}
      <section className={styles.heroSection}>

        <div className={styles.logoArea}>
          <p className={styles.welcomeText}>Welcome to</p>
          <img src="/Logo.png" alt="Fes Lounge & Café" className={styles.logo} />
        </div>

        <div className={styles.drinkCats}>
          {drinkCategories.map((cat) => (
            <button
              key={cat.name}
              className={styles.catBtn}
              onClick={() => navigate(`/category/${cat.name}`)}
            >
              <div className={styles.boxWrapper}>
                <img src="/box.png" alt="" aria-hidden="true" />
                <span className={styles.boxLabel} style={{ color: cat.color }}>
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.scrollSign}>
          <img src="/Sign.png" alt="scroll down for food" />
        </div>

      </section>

      {/* ── Section 2: Food ring — revealed on scroll ── */}
      <section className={styles.foodSection}>
        <div className={styles.foodCats}>
          {foodCategories.map((cat, i) => (
            <button
              key={cat.name}
              ref={(el) => (foodRefs.current[i] = el)}
              className={styles.foodBtn}
              style={{ transitionDelay: `${i * 0.18}s` }}
              onClick={() => navigate(`/category/${cat.name}`)}
            >
              <div className={styles.boxWrapper}>
                <img src="/box.png" alt="" aria-hidden="true" />
                <span className={styles.boxLabel} style={{ color: cat.color }}>
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  )
}
