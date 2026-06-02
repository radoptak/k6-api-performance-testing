export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Mechanical Keyboard',
    category: 'accessories',
    price: 129.99,
    inStock: true,
  },
  {
    id: 'prod-002',
    name: 'Wireless Mouse',
    category: 'accessories',
    price: 59.99,
    inStock: true,
  },
  {
    id: 'prod-003',
    name: 'USB-C Docking Station',
    category: 'hardware',
    price: 199.99,
    inStock: false,
  },
];