import express from 'express';
import FollowupsController from '../controllers/followups.controller.js';

const router = express.Router();

router.get('/', FollowupsController.getAll);
router.get('/:id', FollowupsController.getById);
router.post('/', FollowupsController.create);
router.put('/:id', FollowupsController.update);
router.delete('/:id', FollowupsController.delete);

export default router;
