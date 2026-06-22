import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/i18n';

export default function BackButton({ onClick }) {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  return (
    <button className="back-button" onClick={onClick}>
      <ArrowLeft size={18} />
      {t(lang, 'goBack')}
    </button>
  );
}
