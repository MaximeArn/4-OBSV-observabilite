import { Product } from './product';

export type CartItem = {
  product: Product;
  quantity: number;
};
export class Cart {
  private cart: Record<number, CartItem>;

  constructor() {
    this.cart = [];
  }

  addItem(product: Product, quantity: number) {
    if (quantity <= 0) {
      throw new Error('quantity should be a positive number');
    }
    const { id } = product;
    let totalQuantity = quantity;
    const alreadyInCart = this.cart[id];
    if (alreadyInCart !== undefined) {
      totalQuantity += alreadyInCart.quantity;
    }
    this.cart[id] = { product, quantity: totalQuantity };
  }

  removeItem(product: Product) {
    delete this.cart[product.id];
  }

  cartTotal() {
    return Object.entries(this.cart).reduce((current, entry) => {
      const item = entry[1];
      return current + item.quantity * item.product.price;
    }, 0);
  }

  summary() {
    return Object.values(this.cart) || [];
  }

  isEmpty() {
    return Object.keys(this.cart).length === 0;
  }
}
