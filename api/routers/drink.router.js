import {Router} from 'express';
import * as DrinkController from '../controlls/drink.controller';
const router = new Router();

router.route('/create-product')
  .post(DrinkController.createDrink);
router.route('/get-all-product')
  .get(DrinkController.getAllDrink);
router.route('/get-product-by-status/:status')
  .get(DrinkController.getProductByStatus)
router.route('/get-product-by-type/:type')
	.get(DrinkController.getProductByType)
router.route('/:id')
  .delete(DrinkController.deleteDrink)
  .get(DrinkController.getDrink)
  .put(DrinkController.editDrink);


export default router;