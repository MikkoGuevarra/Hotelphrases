import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'category/:id',
    loadComponent: () =>
      import('./pages/category/category').then((m) => m.Category),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites').then((m) => m.FavoritesPage),
  },
  {
    path: 'compose',
    loadComponent: () =>
      import('./pages/phrase-builder/phrase-builder').then(
        (m) => m.PhraseBuilder,
      ),
  },
  {
    path: 'guide',
    loadComponent: () =>
      import('./pages/work-guide/work-guide').then((m) => m.WorkGuide),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
