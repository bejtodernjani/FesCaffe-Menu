import { useParams, useNavigate } from 'react-router-dom'
import { menuData } from '../data/menuData'
import styles from './CategoryPage.module.css'

const categoryMeta = {
  breakfast: { color: '#1a1a1a' },
  pizza:     { color: '#E8192C' },
  lunch:     { color: '#2D6A4F' },
  salads:    { color: '#E07B3A' },
  pasta:     { color: '#C2651D' },
  desserts:  { color: '#1a1a1a' },
}

export default function CategoryPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const items = menuData[name] || []
  const meta = categoryMeta[name] || { color: '#1a1a1a' }

  return (
    <div className={styles.page}>

      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← back
      </button>

      {/* Tab: box.png + CSS text overlay — sharp, translatable */}
      <div className={styles.tabWrapper}>
        <div className={styles.boxWrapper}>
          <img src="/box.png" alt="" aria-hidden="true" />
          <span className={styles.tabLabel} style={{ color: meta.color }}>
            {name}
          </span>
        </div>
      </div>

      {/* Connector lines + rings */}
      <div className={styles.connector}>
        <div className={styles.line} />
        <div className={styles.line} />
      </div>

      {/* Menu content panel */}
      <div className={styles.panel}>
        {items.length === 0 ? (
          <p className={styles.empty}>Menu coming soon…</p>
        ) : (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemName} style={{ color: meta.color }}>
                    {item.name}
                  </span>
                  <span className={styles.itemPrice}>{item.price}</span>
                </div>
                <p className={styles.itemDesc}>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}
