import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { coldDrinks, hotDrinks } from '../data/menuData'
import styles from './DrinksPage.module.css'

function DrinkGroup({ title, items }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemPrice}>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DrinkSection({ label, color, groups, sectionRef, className }) {
  return (
    <div className={className} ref={sectionRef}>
      {/* Tab */}
      <div className={styles.tabWrapper}>
        <div className={styles.boxWrapper}>
          <img src="/box.png" alt="" aria-hidden="true" />
          <span className={styles.tabLabel} style={{ color }}>{label}</span>
        </div>
      </div>

      {/* Connector */}
      <div className={styles.connector}>
        <div className={styles.line} />
        <div className={styles.line} />
      </div>

      {/* Panel */}
      <div className={styles.panel}>
        {groups.map((g) => (
          <DrinkGroup key={g.title} title={g.title} items={g.items} />
        ))}
      </div>
    </div>
  )
}

export default function DrinksPage() {
  const navigate = useNavigate()
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
    { title: 'Coffees', items: coldDrinks.coffees },
    { title: 'Drinks',  items: coldDrinks.drinks  },
  ]

  const hotGroups = [
    { title: 'Coffees', items: hotDrinks.coffees },
    { title: 'Tea',     items: hotDrinks.tea      },
  ]

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← back
      </button>

      <DrinkSection
        label="cold"
        color="#1a1a1a"
        groups={coldGroups}
        className={styles.section}
      />

      <DrinkSection
        label="hot"
        color="#E8192C"
        groups={hotGroups}
        sectionRef={hotRef}
        className={`${styles.section} ${styles.hotSection}`}
      />
    </div>
  )
}
