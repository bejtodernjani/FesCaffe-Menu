import { useLang } from '../context/LanguageContext'
import { t, mkFont } from '../data/translations'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, setLang } = useLang()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span
          className={styles.title}
          style={{ fontFamily: mkFont(lang) }}
        >
          {t[lang].nav.menu}
        </span>

        <div className={styles.flags}>
          <button
            className={`${styles.flagBtn} ${lang === 'mk' ? styles.active : ''}`}
            onClick={() => setLang('mk')}
            aria-label="Македонски"
          >
            🇲🇰
          </button>
          <button
            className={`${styles.flagBtn} ${lang === 'en' ? styles.active : ''}`}
            onClick={() => setLang('en')}
            aria-label="English"
          >
            🇺🇸
          </button>
        </div>
      </div>
    </nav>
  )
}
