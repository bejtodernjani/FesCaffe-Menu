import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { coldDrinks, hotDrinks } from '../data/menuData'
import { useLang } from '../context/LanguageContext'
import { t, mkFont } from '../data/translations'
import styles from './DrinksPage.module.css'

function DrinkGroup({ title, items, lang }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle} style={{ fontFamily: mkFont(lang) }}>
        {title}
      </h3>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={item.id} className={styles.item} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemPrice}>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DrinkSection({ label, color, groups, sectionRef, className, lang }) {
  return (
    <div className={className} ref={sectionRef}>
      <div className={styles.tabWrapper}>
        <div className={styles.boxWrapper}>
          <img src="/box.png" alt="" aria-hidden="true" />
          <span
            className={styles.tabLabel}
            style={{ color, fontFamily: mkFont(lang) }}
          >
            {label}
          </span>
        </div>
      </div>

      <div className={styles.connector}>
        <div className={styles.line} />
        <div className={styles.line} />
      </div>

      <div className={styles.panel}>
        {groups.map((g) => (
          <DrinkGroup key={g.title} title={g.title} items={g.items} lang={lang} />
        ))}
      </div>
    </div>
  )
}

export default function DrinksPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const hotRef = useRef(null)

  useEffect(() => {
    const el = hotRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const coldGroups = [
    { title: t[lang].drinks.coffees, items: coldDrinks.coffees },
    { title: t[lang].drinks.drinks,  items: coldDrinks.drinks  },
  ]

  const hotGroups = [
    { title: t[lang].drinks.coffees, items: hotDrinks.coffees },
    { title: t[lang].drinks.tea,     items: hotDrinks.tea      },
  ]

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        {t[lang].common.back}
      </button>

      <DrinkSection
        label={t[lang].drinks.cold}
        color="#1a1a1a"
        groups={coldGroups}
        className={styles.section}
        lang={lang}
      />

      <DrinkSection
        label={t[lang].drinks.hot}
        color="#E8192C"
        groups={hotGroups}
        sectionRef={hotRef}
        className={`${styles.section} ${styles.hotSection}`}
        lang={lang}
      />
    </div>
  )
}
