import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import styles from './HomePage.module.css'

const drinkCategories = [
  { name: 'drinks',   image: '/Drinks.png' },
  { name: 'desserts', image: '/Dessert.png' },
]

const foodCategories = [
  { name: 'breakfast', image: '/Breakfast.png' },
  { name: 'pizza',     image: '/Pizza.png' },
  { name: 'lunch',     image: '/Lunch.png' },
  { name: 'salads',    image: '/Salads.png' },
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

      {/* ── Section 1: logo + drinks/desserts + scroll sign ── */}
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
              <img src={cat.image} alt={cat.name} />
            </button>
          ))}
        </div>

        <div className={styles.scrollSign}>
          <img src="/Sign.png" alt="scroll down for food" />
        </div>
      </section>

      {/* ── Section 2: food categories revealed on scroll ── */}
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
              <img src={cat.image} alt={cat.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'flex'
                }}
              />
              <span className={styles.fallback}>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  )
}
