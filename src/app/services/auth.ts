import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ForgotPasswordModel,
  ForgotPasswordResponse,
  LoginModel,
  LoginResponse,
  RegisterModel,
  RegisterResponse,
  ResetPasswordModel,
  ResetPasswordResponse,
  VerifyUserOTP,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/api/auth';

  login(obj: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, obj);
  }

  register(obj: RegisterModel): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, obj);
  }

  verify(obj: VerifyUserOTP): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/verify`, obj);
  }

  forgotPassword(obj: ForgotPasswordModel): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.apiUrl}/forgot-password`,
      obj
    );
  }

  resetPassword(obj: ResetPasswordModel): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      `${this.apiUrl}/reset-password`,
      obj
    );
  }
}
