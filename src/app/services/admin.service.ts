import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProviderRegisterRequest {
  providerName: string;
  contact: string;
  email: string;
  password: string;
  name: string;
}

export interface UserDto {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface ProviderResponseDto {
  id: number;
  providerName: string;
  contact: string;
  email: string;
  name: string;
  role: string;
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
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  registerProvider(request: ProviderRegisterRequest): Observable<ProviderResponseDto> {
    return this.http.post<ProviderResponseDto>(`${this.apiUrl}/register`, request);
  }

  getAllUsers(role?: string, page = 0, size = 10): Observable<PaginatedResponse<UserDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (role) {
      params = params.set('role', role);
    }

    return this.http.get<PaginatedResponse<UserDto>>(`${this.apiUrl}/users`, { params });
  }

  deleteProvider(id: number): Observable<{ message: string; providerId: string }> {
    return this.http.delete<{ message: string; providerId: string }>(`${this.apiUrl}/providers/${id}`);
  }
}