import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    CardModule,
    ProgressSpinnerModule,
    SelectModule,
    ToastModule,
    FileUploadModule,
  ],
  providers: [MessageService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  };

  isEditMode = signal(false);
  productId = signal<number | null>(null);
  loading = signal(false);

  categorias = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Jewelery', value: 'jewelery' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.productId.set(Number(id));
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number): void {
    this.loading.set(true);
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product not found',
        });
        this.loading.set(false);
        this.router.navigate(['/products']);
      },
    });
  }

  onSubmit(): void {
    if (!this.isValid()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all required fields',
      });
      return;
    }

    if (this.isEditMode()) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct(): void {
    this.loading.set(true);
    this.productService.createProduct(this.product).subscribe({
      next: (newProduct) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product created successfully!',
        });
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create product',
        });
        this.loading.set(false);
      },
    });
  }

  updateProduct(): void {
    this.loading.set(true);
    this.productService.updateProduct(this.productId()!, this.product).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product updated successfully!',
        });
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product',
        });
        this.loading.set(false);
      },
    });
  }

  isValid(): boolean {
    return !!(
      this.product.title &&
      this.product.price > 0 &&
      this.product.description &&
      this.product.category &&
      this.product.image
    );
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  onImageSelected(event: any): void {
    const file = event.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      // --- SIMULACIÓN DE SUBIDA Y OBTENCIÓN DE URL ---
      // En un caso real, aquí subirías 'file' a un servicio cloud (Cloudinary, AWS S3, etc.)
      // y en la respuesta obtendrías la URL pública.

      // Para esta demo, creamos una URL local temporal para la previsualización.
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.image = e.target.result; // Asigna la URL temporal al modelo
        this.messageService.add({
          severity: 'info',
          summary: 'Imagen Seleccionada',
          detail: `Archivo "${file.name}" listo para enviar.`,
        });
      };
      reader.readAsDataURL(file);

      // Limpia el componente para que pueda seleccionar otro archivo si es necesario
      // event.callback(); // Descomenta si usas 'auto' y quieres reiniciar el componente
    }
  }

  clearImage(): void {
    this.product.image = '';
  }
}
