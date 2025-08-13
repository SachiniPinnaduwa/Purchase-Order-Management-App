import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

import { PurchaseOrder } from '../../models/purchase-order.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-list',
  imports: [
    DatePipe,
    DecimalPipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './purchase-order-list.component.html',
  styleUrl: './purchase-order-list.component.scss',
})
export class PurchaseOrderListComponent implements OnInit {
  displayedColumns: string[] = [
    'poNumber',
    'poDescription',
    'supplierName',
    'orderDate',
    'totalAmount',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<PurchaseOrder>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private purchaseOrderService: PurchaseOrderService) {}

  ngOnInit(): void {
    this.loadPurchaseOrders();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'orderDate':
          return new Date(item.orderDate).getTime();
        case 'totalAmount':
          return item.totalAmount;
        default:
          return item[property as keyof PurchaseOrder];
      }
    };
  }

  loadPurchaseOrders(): void {
    this.purchaseOrderService.getPurchaseOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Custom sorting for date and currency fields
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'orderDate':
              return new Date(item.orderDate).getTime();
            case 'totalAmount':
              return item.totalAmount;
            default:
              return item[property as keyof PurchaseOrder];
          }
        };
      },
      error: (err) => console.error('Failed to load orders', err),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePurchaseOrder(id: number): void {
    if (confirm('Are you sure you want to delete this purchase order?')) {
      this.purchaseOrderService.deletePurchaseOrder(id).subscribe({
        next: () => this.loadPurchaseOrders(),
        error: (err) => console.error('Failed to delete order', err),
      });
    }
  }

  isLoading = false;
}
