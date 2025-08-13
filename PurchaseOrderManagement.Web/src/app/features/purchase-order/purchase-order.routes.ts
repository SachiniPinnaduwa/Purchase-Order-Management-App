import { Routes } from '@angular/router';

import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './components/purchase-order-form/purchase-order-form.component';
import { PurchaseOrderDetailComponent } from './components/purchase-order-detail/purchase-order-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: PurchaseOrderListComponent,
    title: 'Purchase Orders',
  },
  {
    path: 'create',
    component: PurchaseOrderFormComponent,
    title: 'Create Purchase Order',
  },
  {
    path: 'edit/:id',
    component: PurchaseOrderFormComponent,
    title: 'Edit Purchase Order',
  },
  {
    path: 'view/:id',
    component: PurchaseOrderDetailComponent,
    title: 'View Purchase Order',
  },
];
