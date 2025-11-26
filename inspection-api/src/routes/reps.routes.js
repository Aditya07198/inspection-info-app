import express from 'express';
import RepsController from '../controllers/reps.controller.js';

const router = express.Router();

router.get('/', RepsController.getAll);
router.get('/:id', RepsController.getById);
router.post('/', RepsController.create);
router.put('/:id', RepsController.update);
router.delete('/:id', RepsController.delete);

export default router;
