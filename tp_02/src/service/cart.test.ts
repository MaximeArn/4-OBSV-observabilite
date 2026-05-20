import { Cart } from './cart';
import { ProductRepository } from './product';

describe('Cart', () => {
  const product = ProductRepository.findById(1)!;
  it('should create empty carts', () => {
    const cart = new Cart();
    expect(cart.isEmpty()).toBeTruthy();
  });

  it('should add items to a cart', () => {
    const cart = new Cart();
    cart.addItem(product, 3);
    expect(cart.summary()).toMatchObject([{ product, quantity: 3 }]);
  });

  it('should increment quantity for items already in the cart', () => {
    const cart = new Cart();
    cart.addItem(product, 3);
    cart.addItem(product, 2);
    cart.addItem(product, 1);
    expect(cart.summary()).toMatchObject([{ product, quantity: 6 }]);
  });

  it('should remove items to a cart', () => {
    const cart = new Cart();
    cart.addItem(product, 3);
    cart.removeItem(product);
    expect(cart.summary()).toMatchObject([]);
  });

  it('should compute total', () => {
    const cart = new Cart();
    cart.addItem(product, 3);
    expect(cart.cartTotal()).toBe(3 * product.price);
  });

  it('should give cart summary', () => {
    const cart = new Cart();
    expect(cart.summary()).toMatchObject([]);

    cart.addItem(product, 3);
    expect(cart.summary()).toMatchObject([{ product, quantity: 3 }]);
  });
});
