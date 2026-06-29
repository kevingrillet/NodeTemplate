# Changelog

Toutes les modifications notables de ce projet sont consignées ici.
Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

## [0.2.0]

### Ajouté

- Design system interne `src/components/ui/` (`Button`, `Input`, `Textarea`,
  `Select`, `Checkbox`, `Badge`, `Callout`, `Panel`, `Accordion`, `CopyButton`),
  chacun avec sa story Storybook et son test — composants stylés uniquement via
  les tokens de thème.
- Composants `Checkbox` (case à cocher contrôlée) et `Callout` (notice d'état
  contextuelle, tons info/success/warning/danger).
- Hooks `useDebouncedValue` (valeur retardée pour calculs lourds) et
  `useCachedState` / `usePersistentBoolean` (cache opt-in en `localStorage`).
- Utilitaire `src/lib/readTextFile.ts` (lecture texte d'un `File` avec gestion d'erreur).
- Utilitaire `src/lib/cx.ts` (concaténation de classes conditionnelles).
- Token de couleur `--color-success` (états positifs / badges), décliné clair/sombre.
- `CLAUDE.md` : guide pour agents IA (stack, conventions, bonnes pratiques).
- Dependabot : `.github/dependabot.yml` (npm + github-actions) et workflow
  `dependabot-auto-merge.yml`.

### Modifié

- PWA : précache de tous les assets buildés et nom de cache suffixé d'un hash de
  build (plugin `pwaPrecache` dans `vite.config.ts`) → vrai hors-ligne dès la
  première visite et invalidation automatique à chaque déploiement.
- Accessibilité : `CopyButton` annonce la confirmation via une région live
  `sr-only` dédiée ; `Input` et `Textarea` exposent leur message d'erreur en
  `role="alert"`.
- `src/test/setup.ts` : garde `typeof window` pour les tests en environnement `node`.

## [0.1.0] — Template initial

### Ajouté

- Stack React 19 + TypeScript 6 + Vite 8.
- Tailwind CSS v4 (config CSS-first, `@theme inline`).
- Système de thèmes au runtime : 4 identités (`default`, `atelier`, `blueprint`,
  `aurora`) × clair/sombre, persistées dans `localStorage`, avec script anti-flash.
- Internationalisation maison FR/EN (sans dépendance) + bouton de bascule.
- PWA : manifest installable + service worker (offline).
- Tests : Vitest + Testing Library (unitaires/composants), Playwright (e2e).
- Storybook 10 avec barre d'outils Thème/Mode.
- Qualité : ESLint 10 (flat config) + Prettier.
- CI/CD : GitHub Actions (qualité + tests, déploiement GitHub Pages).
- Page de démonstration câblant l'ensemble de l'infrastructure.
