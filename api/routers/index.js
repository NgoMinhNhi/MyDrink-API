//quan ly routers
import {Router} from 'express';
import UserRouter from './user.router';
import OrderRouter from './order.router';
import DrinkRouter from './drink.router';
const router = new Router();

router.use('/user', UserRouter);
router.use('/order', OrderRouter);
router.use('/drink', DrinkRouter);
export default router;
