export type ProductResponseItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

export type ProductsResponse = {
  data: ProductResponseItem[];
  count: number;
};

export function isProductResponseItem(value: unknown): value is ProductResponseItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const product = value as ProductResponseItem;

  return (
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.category === 'string' &&
    typeof product.price === 'number' &&
    typeof product.inStock === 'boolean'
  );
}

export function isProductsResponse(value: unknown): value is ProductsResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const response = value as ProductsResponse;

  return (
    Array.isArray(response.data) &&
    response.data.every(isProductResponseItem) &&
    typeof response.count === 'number'
  );
}