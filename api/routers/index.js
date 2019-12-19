//quan ly routers
import {Router} from 'express';
import UserRouter from './user.router';
import OrderRouter from './order.router';
import DrinkRouter from './drink.router';
import * as uploadController from '../../upload/upload.controllers';
import multer from 'multer';

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});
const router = new Router();

router.use('/user', UserRouter);
router.use('/order', OrderRouter);
router.use('/drink', DrinkRouter);
router.use('/upload', upload.single('image'), uploadController.createFile);
export default router;
