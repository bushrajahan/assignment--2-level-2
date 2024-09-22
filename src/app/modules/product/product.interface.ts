export interface Variant {
  type: string; // e.g., "size", "color"
  value: string; // e.g., "Small", "Red"
}

export interface Inventory {
  quantity: number; // Available stock quantity
  inStock: boolean; // Whether the product is in stock
}

export interface Product {
  id: number;
  name: string; // Product name
  description: string; // Product description
  price: number; // Product price
  category: string; // Product category
  tags: string[]; // Array of tags/keywords associated with the product
  variants: Variant[]; // Array of product variants (size, color, etc.)
  inventory: Inventory; // Inventory details
}
