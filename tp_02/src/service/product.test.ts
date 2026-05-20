import { ProductRepository } from './product';

describe('Products', () => {
  it('should find product by id', () => {
    const product = ProductRepository.findById(1);
    expect(product).not.toBeUndefined();
  });

  it('should return undefined for unexistent products', () => {
    const product = ProductRepository.findById(42);
    expect(product).toBeUndefined();
  });

  it('should get a list of all available products', () => {
    const products = ProductRepository.getProducts();
    expect(products).not.toBeUndefined();
    expect(products.length).toBeGreaterThan(0);
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('name');
    });
  });
});
