import { Routes } from '@angular/router';
import { routes as purchaseOrderRoutes } from './features/purchase-order/purchase-order.routes';

export const routes: Routes = [
  {
    path: 'purchase-orders',
    loadChildren: () =>
      import('./features/purchase-order/purchase-order.routes').then(
        (m) => m.routes
      ),
  },
  { path: '', redirectTo: 'purchase-orders', pathMatch: 'full' },
];
