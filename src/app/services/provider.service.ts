import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuItemRequest {
  itemName: string;
  price: number;
  tag: string;
}

export interface MenuItemDto {
  id: number;
  itemName: string;
  price: number;
  available: boolean;
  tag: string;
  providerId: number;
  providerName: string;
}

export interface OrderItemDto {
  id: number;
  quantity: number;
  price: number;
  status: string;
  menuItemName: string;
  customerName: string;
  customerEmail: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private apiUrl = 'http://localhost:8080/api/provider';

  constructor(private http: HttpClient) {}

  // Menu Management
  createMenuItem(request: MenuItemRequest): Observable<MenuItemDto> {
    return this.http.post<MenuItemDto>(`${this.apiUrl}/menu`, request);
  }

  updateMenuItem(id: number, request: MenuItemRequest): Observable<MenuItemDto> {
    return this.http.put<MenuItemDto>(`${this.apiUrl}/menu/${id}`, request);
  }

  toggleAvailability(id: number): Observable<MenuItemDto> {
    return this.http.patch<MenuItemDto>(`${this.apiUrl}/menu/${id}/toggle`, {});
  }

  getAllMenuItems(tag?: string, page = 0, size = 10): Observable<{ content: MenuItemDto[] }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (tag) {
      params = params.set('tag', tag);
    }

    return this.http.get<{ content: MenuItemDto[] }>(`${this.apiUrl}/menu`, { params });
  }

  deleteMenuItem(id: number): Observable<{ message: string; itemId: number }> {
    return this.http.delete<{ message: string; itemId: number }>(`${this.apiUrl}/menu/${id}`);
  }

  // Order Management
  getPlacedOrders(tag?: string, page = 0, size = 10): Observable<PaginatedResponse<OrderItemDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (tag) {
      params = params.set('tag', tag);
    }

    return this.http.get<PaginatedResponse<OrderItemDto>>(`${this.apiUrl}/orders`, { params });
  }

  getOrderHistory(tag?: string, page = 0, size = 10): Observable<PaginatedResponse<OrderItemDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (tag) {
      params = params.set('tag', tag);
    }

    return this.http.get<PaginatedResponse<OrderItemDto>>(`${this.apiUrl}/orders/history`, { params });
  }

  markOrderReady(orderItemId: number): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.apiUrl}/orders/${orderItemId}/ready`, {});
  }
}