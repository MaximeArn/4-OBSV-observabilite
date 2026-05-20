import { Request, RequestHandler, Response, Router } from 'express';
import { ProductRepository } from '../service/product';
import { logger } from '../logger/logger';

const productListingController: RequestHandler = (
  req: Request,
  res: Response
) => {
  logger.info('Product list retrieved');
  return res.json(ProductRepository.getProducts());
};

const productController: RequestHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = Number.parseInt(id);
  if (Number.isNaN(productId)) {
    logger.error('Invalid product id requested', { id });
    return res.status(400).json({
      error: 'Invalid request',
      message: `Invalid product id: '{id}'`,
    });
  }
  const product = ProductRepository.findById(productId);
  if (product !== undefined) {
    logger.info('Product retrieved', { productId });
    return res.json(product);
  } else {
    logger.error('Product not found', { productId });
    return res.status(404).json({ error: 'Product not found' });
  }
};

export const productRouter = Router();

productRouter.get('/', productListingController);
productRouter.get('/:id', productController);
