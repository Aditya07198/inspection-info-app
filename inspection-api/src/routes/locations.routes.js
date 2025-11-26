import express from 'express';
import LocationsController from '../controllers/locations.controller.js';

const router = express.Router();

router.get('/', LocationsController.getAll);
router.get('/:id', LocationsController.getById);
router.post('/', LocationsController.create);
router.put('/:id', LocationsController.update);
router.delete('/:id', LocationsController.delete);

export default router;
