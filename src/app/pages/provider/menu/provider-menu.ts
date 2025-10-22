import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProviderService, MenuItemDto, MenuItemRequest } from '../../../services/provider.service';

@Component({
  selector: 'app-provider-menu',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './provider-menu.html',
  styleUrl: './provider-menu.css'
})
export class ProviderMenu implements OnInit {
  menuItems = signal<MenuItemDto[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showForm = signal(false);
  editingItem = signal<MenuItemDto | null>(null);
  
  menuForm: FormGroup;
  menuTags = ['BREAKFAST', 'LUNCH', 'BEVERAGE', 'SNACKS'];

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService
  ) {
    this.menuForm = this.fb.group({
      itemName: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      tag: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.isLoading.set(true);
    this.providerService.getAllMenuItems().subscribe({
      next: (response) => {
        this.menuItems.set(response.content);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load menu items');
        this.isLoading.set(false);
      }
    });
  }

  showAddForm() {
    this.showForm.set(true);
    this.editingItem.set(null);
    this.menuForm.reset();
  }

  editItem(item: MenuItemDto) {
    this.showForm.set(true);
    this.editingItem.set(item);
    this.menuForm.patchValue({
      itemName: item.itemName,
      price: item.price,
      tag: item.tag
    });
  }

  onSubmit() {
    if (this.menuForm.valid) {
      this.isLoading.set(true);
      const request: MenuItemRequest = this.menuForm.value;
      
      const operation = this.editingItem() 
        ? this.providerService.updateMenuItem(this.editingItem()!.id, request)
        : this.providerService.createMenuItem(request);

      operation.subscribe({
        next: (response) => {
          this.successMessage.set(this.editingItem() ? 'Menu item updated successfully!' : 'Menu item created successfully!');
          this.showForm.set(false);
          this.loadMenuItems();
          this.isLoading.set(false);
        },
        error: (error) => {
          this.errorMessage.set('Failed to save menu item');
          this.isLoading.set(false);
        }
      });
    }
  }

  toggleAvailability(item: MenuItemDto) {
    this.providerService.toggleAvailability(item.id).subscribe({
      next: () => {
        this.loadMenuItems();
      },
      error: (error) => {
        this.errorMessage.set('Failed to update availability');
      }
    });
  }

  deleteItem(item: MenuItemDto) {
    if (confirm(`Are you sure you want to delete "${item.itemName}"?`)) {
      this.providerService.deleteMenuItem(item.id).subscribe({
        next: () => {
          this.successMessage.set('Menu item deleted successfully!');
          this.loadMenuItems();
        },
        error: (error) => {
          this.errorMessage.set('Failed to delete menu item');
        }
      });
    }
  }

  cancelForm() {
    this.showForm.set(false);
    this.editingItem.set(null);
    this.menuForm.reset();
  }

  getFieldError(fieldName: string): string {
    const field = this.menuForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['min']) return `${fieldName} must be greater than 0`;
    }
    return '';
  }
}