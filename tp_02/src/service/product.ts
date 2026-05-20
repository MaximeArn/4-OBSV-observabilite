export type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

export class ProductRepository {
  static findById(id: number): Product | undefined {
    return products.find((product) => product.id === id);
  }

  static getProducts(): Product[] {
    return products;
  }
}
