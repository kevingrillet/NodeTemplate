import { describe, it, expect } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider, useI18n } from './I18nProvider';
import App from '../App';

describe('i18n - fonction de traduction', () => {
  it('résout une clé existante en français par défaut', () => {
    const { result } = renderHook(() => useI18n(), { wrapper: I18nProvider });
    expect(result.current.t('demo.title')).toBe('Bienvenue sur le template');
    expect(result.current.t('theme.select')).toBe('Thème');
  });

  it('renvoie la clé telle quelle si elle est inconnue', () => {
    const { result } = renderHook(() => useI18n(), { wrapper: I18nProvider });
    expect(result.current.t('clef.inexistante')).toBe('clef.inexistante');
  });
});

describe('i18n - intégration dans App', () => {
  it('affiche le français par défaut', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Bienvenue sur le template' })).toBeInTheDocument();
  });

  it("bascule toute l'interface en anglais", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Passer en anglais' }));

    expect(screen.getByRole('heading', { name: 'Welcome to the template' })).toBeInTheDocument();
    expect(screen.getByText(/runtime themes/i)).toBeInTheDocument();
  });
});
