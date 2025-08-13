import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PurchaseOrderService } from '../../services/purchase-order.service';
import {
  CreatePurchaseOrder,
  PurchaseOrder,
  PurchaseOrderStatus,
  UpdatePurchaseOrder,
} from '../../models/purchase-order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchase-order-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './purchase-order-form.component.html',
  styleUrl: './purchase-order-form.component.scss',
})
export class PurchaseOrderFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  statusOptions = Object.values(PurchaseOrderStatus);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private poService: PurchaseOrderService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: [null],
      poDescription: ['', Validators.required],
      supplierName: ['', Validators.required],
      orderDate: [new Date(), Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0.01)]],
      status: ['Draft', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.poService.getPurchaseOrder(+id).subscribe({
        next: (po) => {
          this.form.patchValue({
            ...po,
            orderDate: new Date(po.orderDate),
          });
        },
        error: () => this.router.navigate(['/purchase-orders']),
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const operation: Observable<PurchaseOrder | void> = this.isEditMode
        ? this.poService.updatePurchaseOrder(formValue as UpdatePurchaseOrder)
        : this.poService.createPurchaseOrder(formValue as CreatePurchaseOrder);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            `Purchase Order ${this.isEditMode ? 'Updated' : 'Created'}!`,
            'Close',
            {
              duration: 3000,
            }
          );
          this.router.navigate(['/purchase-orders']);
        },
        error: (err: { message: any }) => {
          this.snackBar.open(`Error: ${err.message}`, 'Close', {
            duration: 5000,
          });
        },
      });
    }
  }
}
