import {Router} from 'express';
import * as DrinkController from '../controlls/drink.controller';
const router = new Router();

router.route('/create-product')
  .post(DrinkController.createDrink);
router.route('/:id')
  .delete(DrinkController.deleteDrink)
  .get(DrinkController.getDrink)
  .put(DrinkController.editDrink);
router.route('/get-all-product')
	.get(DrinkController.getAllDrink)

export default router;