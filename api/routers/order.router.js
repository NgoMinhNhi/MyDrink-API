import {Router} from 'express';
import * as OrderController from '../controlls/order.controller';
const router = new Router();
router.route('/create-order')
  .post(OrderController.createOrder);
router.route('/get-all-order')
	.get(OrderController.getAllOrder)
router.route('/:id')
  .delete(OrderController.deleteOrder)
  .get(OrderController.getOrder)
  .put(OrderController.editOrder);
export default router;