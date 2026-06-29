import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('affiche le titre et la page de démonstration', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Node Template', level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Bienvenue sur le template', level: 2 }),
    ).toBeInTheDocument();
  });

  it('expose les contrôles de thème et de langue', () => {
    render(<App />);
    expect(screen.getByRole('combobox', { name: 'Thème' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Passer en anglais' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Activer le mode sombre' })).toBeInTheDocument();
  });
});
