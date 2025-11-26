import express from 'express';
import InspectionOrdersController from '../controllers/inspectionOrders.controller.js';

const router = express.Router();

router.get('/', InspectionOrdersController.getAll);
router.get('/:id', InspectionOrdersController.getById);
router.post('/', InspectionOrdersController.create);
router.put('/:id', InspectionOrdersController.update);
router.delete('/:id', InspectionOrdersController.delete);

export default router;
