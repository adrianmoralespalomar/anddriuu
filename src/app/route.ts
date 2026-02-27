import { Routes } from '@angular/router';

const GENERAL_TITLE = 'Anddriuu';
export const ROUTES: Routes = [
  {
    title: `${GENERAL_TITLE} Gooner`,
    path: '',
    // loadComponent: () => import('./pages/youtuber/youtuber.component').then((x) => x.YoutuberComponent),
    loadComponent: () => import('./pages/gacha/gacha.component').then((x) => x.GachaComponent),
  },
  {
    title: `${GENERAL_TITLE} - Bento`,
    path: 'bento',
    loadComponent: () => import('./pages/another/another.component').then((x) => x.AnotherComponent),
  },
];

export default ROUTES;
