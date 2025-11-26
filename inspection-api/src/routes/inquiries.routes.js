import express from 'express';
import InquiriesController from '../controllers/inquiries.controller.js';

const router = express.Router();

router.get('/', InquiriesController.getAll);
router.get('/:id', InquiriesController.getById);
router.post('/', InquiriesController.create);
router.put('/:id', InquiriesController.update);
router.delete('/:id', InquiriesController.delete);

export default router;
