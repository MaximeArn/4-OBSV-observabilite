import { Request, RequestHandler, Response, Router } from 'express';
import { Cart } from '../service/cart';
import { ProductRepository } from '../service/product';
import { logger } from '../logger/logger';

let cart = new Cart();

const addItemController: RequestHandler = (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const product = ProductRepository.findById(productId);
  if (product) {
    try {
      cart.addItem(product, quantity);
      logger.info('Product added to cart', { productId, quantity });
      return res.json(cart.summary());
    } catch (error) {
      const { message } = error as Error;
      logger.error('Failed to add product to cart', { productId, quantity, error: message });
      return res.status(400).json({ error: 'Invalid request', message });
    }
  } else {
    logger.error('Attempting to add an invalid product to the cart', { productId });
    return res.status(404).json({ error: 'Product not found' });
  }
};

const removeItemController: RequestHandler = (req: Request, res: Response) => {
  const { productId } = req.body;
  const product = ProductRepository.findById(productId);
  if (product) {
    cart.removeItem(product);
    logger.info('Product removed from cart', { productId });
  } else {
    logger.error('Attempting to remove an invalid product from the cart', { productId });
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(cart.summary());
};

const getCartController: RequestHandler = (req: Request, res: Response) => {
  logger.info('Cart retrieved');
  return res.json(cart.summary());
};

const checkoutController: RequestHandler = (req: Request, res: Response) => {
  if (!cart.isEmpty()) {
    const total = cart.cartTotal();
    cart = new Cart();
    logger.info('Checkout successful', { total });
    return res.json({ message: 'Checkout successful', total });
  } else {
    logger.error('Checkout attempted on empty cart');
    return res.status(400).json({ error: 'Cart is empty' });
  }
};

export const cartRouter = Router();

// Add product to cart
cartRouter.post('/addToCart', addItemController);

// Add product to cart
cartRouter.post('/removeFromCart', removeItemController);

// View cart
cartRouter.get('/', getCartController);

// Checkout
cartRouter.post('/checkout', checkoutController);
