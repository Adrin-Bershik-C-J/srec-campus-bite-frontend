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