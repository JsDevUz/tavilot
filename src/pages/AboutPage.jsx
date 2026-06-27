import BackButton from '../components/BackButton';
import ErrorState from '../components/ErrorState';
import Loading from '../components/Loading';
import RichContent from '../components/RichContent';
import { useAsync } from '../hooks/useAsync';
import { getAbout } from '../services/libraryService';
import { useAppStore, useAuthSnapshot } from '../store/useAppStore';
import { getDescription } from '../utils/content';

export default function AboutPage({ goHome }) {
  const lang = useAppStore((state) => state.preferences.lang || 'uz');
  const { token } = useAuthSnapshot();
  const about = useAsync(() => getAbout({ lang, token }), [lang, token]);

  return (
    <section className="about-page">
      <BackButton onClick={goHome} />
      {about.loading && <Loading />}
      {about.error && <ErrorState error={about.error} onRetry={about.refresh} />}
      {about.data && <RichContent>{getDescription(about.data)}</RichContent>}
    </section>
  );
}
