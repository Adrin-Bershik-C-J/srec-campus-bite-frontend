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