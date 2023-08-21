import { lazy } from 'solid-js';
import type { RouteConfig } from '@app/routes';

const router: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@/layout')),
    children: [
      {
        path: '/',
        component: lazy(() => import('@/home')),
      },
    ],
  },
];

export default router;
