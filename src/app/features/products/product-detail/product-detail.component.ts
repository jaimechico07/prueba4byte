import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    ChipModule,
    ToastModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  loading = signal(false);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number): void {
    this.loading.set(true);
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Product Loaded',
          detail: 'Product details loaded successfully!',
          life: 3000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error loading product details. Please try again.',
          life: 5000,
        });
        this.loading.set(false);
      },
    });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder-image.jpg';
  }
}
