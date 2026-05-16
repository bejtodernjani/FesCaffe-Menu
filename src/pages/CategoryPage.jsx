import { useParams, useNavigate } from 'react-router-dom'
import { menuData } from '../data/menuData'
import styles from './CategoryPage.module.css'

const categoryMeta = {
  breakfast: { image: '/Breakfast.png', color: '#1a1a1a' },
  pizza:     { image: '/Pizza.png',     color: '#E8192C' },
  lunch:     { image: '/Lunch.png',     color: '#2D6A4F' },
  salads:    { image: '/Salads.png',    color: '#E07B3A' },
  drinks:    { image: '/Drinks.png',    color: '#1a1a1a' },
  desserts:  { image: '/Dessert.png',   color: '#1a1a1a' },
}

export default function CategoryPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const items = menuData[name] || []
  const meta = categoryMeta[name] || { image: '', color: '#1a1a1a' }
  const backPath = '/'

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(backPath)}>
        ← back
      </button>

      <div className={styles.tabWrapper}>
        <img src={meta.image} alt={name} className={styles.tab} />
      </div>

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
