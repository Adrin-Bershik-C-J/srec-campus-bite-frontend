export class LoginModel {
  email: string = '';
  password: string = '';
}

export interface LoginResponse {
  token: string;
  role: string;
  email: string;
  name: string;
}

export class RegisterModel {
  email: string = '';
  name: string = '';
  password: string = '';
  role: string = '';
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  role: string;
}

export class VerifyUserOTP {
  email: string = '';
  otp: string = '';
}

export class ResetPasswordModel {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
}

export class ForgotPasswordModel {
  email: string = '';
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}
