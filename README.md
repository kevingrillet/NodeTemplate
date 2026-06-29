# Node Template

Template de démarrage pour applications web **statiques** : React + TypeScript + Vite, prêt
à être hébergé gratuitement sur **GitHub Pages**. Il fournit l'architecture et l'outillage
« classiques » d'un projet, sans logique métier — il suffit de remplacer la page de démo.

---

## Stack

| Rôle                         | Outil                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------- |
| Build / dev                  | [Vite](https://vitejs.dev/)                                                     |
| UI                           | [React](https://react.dev/) + TypeScript                                        |
| Style                        | [Tailwind CSS](https://tailwindcss.com/) v4 (config CSS-first, `@theme inline`) |
| Thèmes                       | Maison — runtime, 4 identités × clair/sombre (voir [Thèmes](#thèmes))           |
| i18n                         | Maison — FR/EN, sans dépendance                                                 |
| Tests unitaires / composants | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Tests d'intégration / e2e    | [Playwright](https://playwright.dev/)                                           |
| Documentation des composants | [Storybook](https://storybook.js.org/)                                          |
| Qualité                      | ESLint + Prettier                                                               |
| PWA                          | manifest + service worker (offline)                                             |
| CI/CD                        | GitHub Actions                                                                  |

Les dépendances _runtime_ sont volontairement minimales : `react`, `react-dom`. Tout le
reste est en `devDependencies`.

---

## Démarrage

> Node **≥ 24** requis (voir `.nvmrc`).

```bash
npm install
npm run dev          # serveur de développement
```

### Commandes

| Commande            | Effet                                                  |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Serveur de développement (HMR).                        |
| `npm run build`     | Vérifie les types puis construit le site dans `dist/`. |
| `npm run preview`   | Sert le build de production localement.                |
| `npm run test`      | Tests unitaires / composants (Vitest).                 |
| `npm run test:cov`  | Tests avec couverture.                                 |
| `npm run test:e2e`  | Tests end-to-end (Playwright).                         |
| `npm run lint`      | ESLint.                                                |
| `npm run format`    | Formate le code (Prettier).                            |
| `npm run typecheck` | Vérification des types sans émission.                  |
| `npm run storybook` | Storybook en local (port 6006).                        |
| `npm run check`     | Chaîne complète : format + lint + typecheck + test.    |

---

## Structure

```
src/
├─ components/
│  ├─ ui/           Design system : Button, Input, Textarea, Select, Checkbox, Badge, Callout, Panel, Accordion, CopyButton (+ stories + tests)
│  └─ …             ThemeToggle, ThemeSelector, LanguageSwitcher
├─ hooks/           useTheme (identité + clair/sombre), useDebouncedValue, useCachedState
├─ i18n/            I18nProvider + messages (FR/EN)
├─ lib/             cx (utilitaire de classes), readTextFile
├─ test/            setup Vitest (polyfills localStorage/matchMedia)
├─ App.tsx          page de démonstration — à remplacer
├─ theme.ts         déclaration des thèmes
├─ index.css        tokens des thèmes (variables CSS)
└─ *.stories.tsx    Storybook : Design/Thèmes, Design/Couleurs
tests/              specs Playwright (e2e)
public/             manifest PWA, service worker, icônes
```

Le design system (`src/components/ui/`) est documenté dans Storybook (catalogue
source de vérité). Ses composants sont stylés uniquement via les tokens de thème et
sont sans i18n (libellés passés en props), donc réutilisables tels quels.

---

## Thèmes

Deux axes **indépendants**, tous deux choisis au runtime et persistés dans `localStorage` :

1. **l'identité visuelle** (`default` / `atelier` / `blueprint` / `aurora`), appliquée en
   `data-theme` sur `<html>` ;
2. **le mode clair/sombre**, appliqué via la classe `dark` sur `<html>`.

Les valeurs (couleurs, rayons, ombres, police) vivent dans `src/index.css`
(`[data-theme='…']` et `[data-theme='…'].dark`). `src/theme.ts` déclare la liste et applique
au DOM ; `src/hooks/useTheme.ts` gère l'état, la persistance et l'anti-flash.

**Ajouter un thème** : ajouter son nom dans `THEMES` (`src/theme.ts`), définir ses tokens
clairs et sombres dans `src/index.css`, et son libellé dans `theme.names` (`src/i18n/messages.ts`).

**Personnaliser** : pour un projet à thème unique, retirez les blocs `[data-theme='…']`
superflus et simplifiez `THEMES` / `ThemeSelector`.

---

## i18n

Implémentation maison sans dépendance. `t('a.b.c')` résout une clé pointée dans le
dictionnaire de la langue active. Les deux dictionnaires (`fr`, `en`) partagent l'interface
`Messages`, ce qui garantit qu'aucune clé n'est oubliée.

**Ajouter une chaîne** : étendre l'interface `Messages` dans `src/i18n/messages.ts`, puis
renseigner la valeur dans `fr` **et** `en`.

---

## Déploiement (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` construit et publie `dist/` sur GitHub Pages à
chaque push sur `main`. `base: './'` (dans `vite.config.ts`) produit des chemins relatifs,
compatibles avec un hébergement sous sous-chemin (`https://<user>.github.io/<repo>/`).

Activez Pages dans les réglages du dépôt (source : **GitHub Actions**).

---

## Licence

[MIT](./LICENSE).
