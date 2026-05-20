import { Router } from 'express';
import { ok } from './controllers/ok';
import { notFound } from './controllers/notFound';
import { cartRouter } from './controllers/cart';
import { productRouter } from './controllers/products';

export const api = Router();
api.get('/', ok);
api.use('/cart', cartRouter);
api.use('/products', productRouter);
api.use('*', notFound);
