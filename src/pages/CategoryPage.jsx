import { useParams, useNavigate } from 'react-router-dom'
import { menuData } from '../data/menuData'
import { useLang } from '../context/LanguageContext'
import { t, mkFont } from '../data/translations'
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
  const { lang } = useLang()
  const items = menuData[name] || []
  const meta = categoryMeta[name] || { color: '#1a1a1a' }

  const label = t[lang].cat[name] ?? name

  return (
    <div className={styles.page}>

      <button className={styles.backBtn} onClick={() => navigate('/')}>
        {t[lang].common.back}
      </button>

      <div className={styles.tabWrapper}>
        <div className={styles.boxWrapper}>
          <img src="/box.png" alt="" aria-hidden="true" />
          <span
            className={styles.tabLabel}
            style={{ color: meta.color, fontFamily: mkFont(lang) }}
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
        {items.length === 0 ? (
          <p className={styles.empty}>{t[lang].common.comingSoon}</p>
        ) : (
          <ul className={styles.list}>
            {items.map((item, i) => {
              const itemName = (lang === 'mk' && item.nameMK) ? item.nameMK : item.name
              const itemDesc = (lang === 'mk' && item.descMK)  ? item.descMK  : item.description
              return (
                <li key={item.id} className={styles.item} style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                  <div className={styles.itemHeader}>
                    <span
                      className={styles.itemName}
                      style={{ color: meta.color, fontFamily: mkFont(lang) }}
                    >
                      {itemName}
                    </span>
                    <span className={styles.itemPrice}>{item.price}</span>
                  </div>
                  <p className={styles.itemDesc}>{itemDesc}</p>
                </li>
              )
            })}
          </ul>
        )}
      </div>

    </div>
  )
}
