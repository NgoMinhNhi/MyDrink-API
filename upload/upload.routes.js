import { Router } from 'express';

import * as uploadController from './upload.controllers';
import multer from 'multer';

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});


const routes = new Router();

routes.post(
  '/',
  upload.single('image'),
  uploadController.createFile,
);
// routes.patch(
//   '/:id',
//   authJwt,
//   uploadController.updateFile,
// );
routes.delete('/', uploadController.deleteFile);

export default routes;
