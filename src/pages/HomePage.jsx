import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { t, mkFont } from '../data/translations'
import styles from './HomePage.module.css'

const drinkCategories = [
  { key: 'drinks',   color: '#1a1a1a' },
  { key: 'desserts', color: '#1a1a1a' },
]

const foodCategories = [
  { key: 'breakfast', color: '#1a1a1a' },
  { key: 'pizza',     color: '#E8192C' },
  { key: 'lunch',     color: '#2D6A4F' },
  { key: 'salads',    color: '#E07B3A' },
  { key: 'pasta',     color: '#C2651D' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { lang } = useLang()
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
      { threshold: 0.15 },
    )
    foodRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page}>
      <img src="/section_seperator.png" alt="" aria-hidden="true" className={styles.separator} />

      {/* ── Section 1: Hero ── */}
      <section className={styles.heroSection}>
        <div className={styles.logoArea}>
          <p className={styles.welcomeText} style={{ fontFamily: mkFont(lang) }}>
            {t[lang].home.welcome}
          </p>
          <img src="/Logo.png" alt="Fes Lounge & Café" className={styles.logo} />
        </div>

        <div className={styles.drinkStack}>
          <div className={styles.drinkCats}>
            {drinkCategories.map((cat) => (
              <button
                key={cat.key}
                className={styles.catBtn}
                onClick={() => navigate(`/category/${cat.key}`)}
              >
                <div className={styles.boxWrapper}>
                  <img src="/box.png" alt="" aria-hidden="true" />
                  <span
                    className={styles.boxLabel}
                    style={{ color: cat.color, fontFamily: mkFont(lang) }}
                  >
                    {t[lang].cat[cat.key]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.scrollSign}>
            <div className={styles.boxWrapper}>
              <img src="/Sign.png" alt="" aria-hidden="true" />
              <span
                className={styles.signLabel}
                style={{ fontFamily: mkFont(lang) }}
              >
                {t[lang].home.checkFood}
              </span>
            </div>
          </div>
        </div>

        <img src="/chef.png" alt="" aria-hidden="true" className={styles.chefImg} />
      </section>

      <img src="/section_seperator.png" alt="" aria-hidden="true" className={styles.separator} />

      {/* ── Section 2: Food ring — scroll reveal ── */}
      <section className={styles.foodSection}>
        <div className={styles.foodCats}>
          {foodCategories.map((cat, i) => (
            <button
              key={cat.key}
              ref={(el) => (foodRefs.current[i] = el)}
              className={styles.foodBtn}
              style={{ transitionDelay: `${i * 0.18}s` }}
              onClick={() => navigate(`/category/${cat.key}`)}
            >
              <div className={styles.boxWrapper}>
                <img src="/box.png" alt="" aria-hidden="true" />
                <span
                  className={styles.boxLabel}
                  style={{ color: cat.color, fontFamily: mkFont(lang) }}
                >
                  {t[lang].cat[cat.key]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
