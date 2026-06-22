import uz from '../../public/assets/tr/uz-UZ.json';
import ru from '../../public/assets/tr/ru-RU.json';

const dictionaries = { uz, kr: uz, ru, en: uz, tr: uz, ar: uz };

export function t(lang, key) {
  return dictionaries[lang]?.[key] || dictionaries.uz[key] || key;
}
