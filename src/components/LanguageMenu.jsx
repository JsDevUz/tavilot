import { Languages } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const languages = [
  { value: 'uz', label: 'Lotin' },
  { value: 'kr', label: 'Kiril' },
];

export default function LanguageMenu() {
  const lang = useAppStore((state) => (state.preferences.lang === 'kr' ? 'kr' : 'uz'));
  const setLang = useAppStore((state) => state.setLang);
  return (
    <label className="language-menu">
      <Languages size={18} />
      <select value={lang} onChange={(event) => setLang(event.target.value)}>
        {languages.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
