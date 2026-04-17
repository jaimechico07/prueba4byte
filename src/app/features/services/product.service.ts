// src/app/features/services/product.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL = 'https://fakestoreapi.com/products';

  // Signals para estado
  loading = signal<boolean>(false);
  products = signal<Product[]>([]);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Product[]>(this.API_URL);
  }

  getProduct(id: number): Observable<Product> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.post<Product>(this.API_URL, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
