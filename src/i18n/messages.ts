/**
 * Dictionnaires de traduction (français / anglais).
 *
 * Le français est la langue de référence. L'interface `Messages` garantit que
 * les deux dictionnaires ont la même structure : il est impossible d'oublier une
 * section. Les chaînes sont organisées par domaine et résolues via `t('a.b.c')`
 * (notation pointée) dans `I18nProvider`.
 *
 * Pour ajouter une chaîne : étendre l'interface `Messages`, puis renseigner la
 * valeur dans `fr` ET `en` (TypeScript refusera la compilation sinon).
 */
export type Lang = 'fr' | 'en';

export const LANGS: Lang[] = ['fr', 'en'];

export interface Messages {
  app: { title: string };
  /** Libellés d'accessibilité réutilisables. */
  a11y: { skipToContent: string };
  theme: {
    toLight: string;
    toDark: string;
    light: string;
    dark: string;
    /** Libellé du sélecteur d'identité visuelle. */
    select: string;
    /** Noms des identités visuelles (clé = default | atelier | blueprint | aurora). */
    names: Record<string, string>;
  };
  language: { label: string; toggle: string };
  /** Textes de la page de démonstration (à remplacer dans un vrai projet). */
  demo: { title: string; body: string };
}

const fr: Messages = {
  app: {
    title: 'Node Template',
  },
  a11y: { skipToContent: 'Aller au contenu' },
  theme: {
    toLight: 'Activer le mode clair',
    toDark: 'Activer le mode sombre',
    light: 'Mode clair',
    dark: 'Mode sombre',
    select: 'Thème',
    names: {
      default: 'Défaut',
      atelier: 'Atelier',
      blueprint: 'Blueprint',
      aurora: 'Aurora',
    },
  },
  language: { label: 'Langue', toggle: 'Passer en anglais' },
  demo: {
    title: 'Bienvenue sur le template',
    body: 'React + TypeScript + Vite, avec thèmes au runtime, i18n FR/EN et PWA. Utilisez les contrôles en haut à droite : le sélecteur change l’identité visuelle, le bouton bascule clair/sombre, et le drapeau change la langue. Remplacez cette page pour démarrer votre projet.',
  },
};

const en: Messages = {
  app: {
    title: 'Node Template',
  },
  a11y: { skipToContent: 'Skip to content' },
  theme: {
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    light: 'Light mode',
    dark: 'Dark mode',
    select: 'Theme',
    names: {
      default: 'Default',
      atelier: 'Atelier',
      blueprint: 'Blueprint',
      aurora: 'Aurora',
    },
  },
  language: { label: 'Language', toggle: 'Switch to French' },
  demo: {
    title: 'Welcome to the template',
    body: 'React + TypeScript + Vite, with runtime themes, FR/EN i18n and PWA. Use the controls in the top-right: the selector changes the visual identity, the button toggles light/dark, and the flag switches language. Replace this page to start your project.',
  },
};

export const messages: Record<Lang, Messages> = { fr, en };
