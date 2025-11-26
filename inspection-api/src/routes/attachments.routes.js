import express from 'express';
import AttachmentsController from '../controllers/attachments.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', AttachmentsController.getAll);
router.get('/:id', AttachmentsController.getById);
router.get('/entity/:entityName/:entityId', AttachmentsController.getByEntity);

// Upload: multipart/form-data with
//   file (File)
//   entity_name (string)
//   entity_id (number)
//   description (string, optional)
//   uploaded_by_rep_id (number, optional)
router.post('/', upload.single('file'), AttachmentsController.upload);

// Download binary file for an attachment
router.get('/:id/file', AttachmentsController.download);

router.delete('/:id', AttachmentsController.delete);

export default router;
