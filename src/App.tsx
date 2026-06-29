/**
 * Composant racine du template — page de démonstration.
 *
 * Elle ne sert qu'à montrer comment l'infrastructure se câble ; remplacez tout
 * le contenu de `AppContent` par votre application.
 *
 * `App` fournit le contexte i18n (`I18nProvider`) puis délègue à `AppContent`, qui
 * branche le thème (identité + clair/sombre via `useTheme`) sur les contrôles
 * d'en-tête (`ThemeSelector`, `LanguageSwitcher`, `ThemeToggle`).
 */
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeSelector } from './components/ThemeSelector';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTheme } from './hooks/useTheme';
import { I18nProvider, useI18n } from './i18n/I18nProvider';

function AppContent() {
  const { t } = useI18n();
  const { mode, toggleMode, themeName, setThemeName } = useTheme();

  return (
    <div className="min-h-full bg-canvas font-base text-fg">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <a
          href="#main"
          className="sr-only rounded-control bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          {t('a11y.skipToContent')}
        </a>
        <header className="mb-8 flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeSelector value={themeName} onChange={setThemeName} />
            <LanguageSwitcher />
            <ThemeToggle theme={mode} onToggle={toggleMode} />
          </div>
        </header>

        <main id="main">
          <section className="rounded-card border bg-surface p-6 shadow-card">
            <h2 className="text-lg font-semibold">{t('demo.title')}</h2>
            <p className="mt-2 text-sm text-fg-muted">{t('demo.body')}</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
