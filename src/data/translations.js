export const t = {
  en: {
    nav:   { menu: 'Menu' },
    home:  { welcome: 'Welcome to', checkFood: 'check our food' },
    cat:   {
      breakfast: 'breakfast',
      pizza:     'pizza',
      lunch:     'lunch',
      salads:    'salads',
      pasta:     'pasta',
      drinks:    'drinks',
      desserts:  'desserts',
    },
    common: { back: '← back', comingSoon: 'Menu coming soon…' },
    drinks: {
      cold:    'cold',
      hot:     'hot',
      coffees: 'Coffees',
      drinks:  'Drinks',
      tea:     'Tea',
    },
  },

  mk: {
    nav:   { menu: 'Мени' },
    home:  { welcome: 'Добредојдовте во', checkFood: 'провери ја нашата храна' },
    cat:   {
      breakfast: 'појадок',
      pizza:     'пица',
      lunch:     'ручек',
      salads:    'салати',
      pasta:     'тестенини',
      drinks:    'пијалаци',
      desserts:  'десерти',
    },
    common: { back: '← назад', comingSoon: 'Мени наскоро…' },
    drinks: {
      cold:    'ладно',
      hot:     'топло',
      coffees: 'Кафиња',
      drinks:  'Пијалаци',
      tea:     'Чај',
    },
  },
}

export function mkFont(lang) {
  return lang === 'mk' ? "'Marck Script', cursive" : "'Caveat', cursive"
}
