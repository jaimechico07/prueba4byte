import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ProgressSpinnerModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(false);
  searchTerm = signal('');

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.products();

    return this.products().filter((product) => product.title.toLowerCase().includes(term));
  });

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private messageService: MessageService,
    private ConfirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Products loaded successfully!',
          life: 3000,
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error loading products. Please try again.',
          life: 5000,
        });
      },
    });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder-image.jpg';
  }

  confirmDelete(product: Product): void {
    this.ConfirmationService.confirm({
      message: `Are you sure you want to delete "${product.title}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.deleteProduct(product.id!);
      },
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        const currentProducts = this.products();
        const updatedProducts = currentProducts.filter((p) => p.id !== id);
        this.products.set(updatedProducts);

        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Product deleted successfully!',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete product',
        });
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'info',
      summary: 'Logged Out',
      detail: 'You have been logged out successfully.',
      life: 3000,
    });
  }
}
