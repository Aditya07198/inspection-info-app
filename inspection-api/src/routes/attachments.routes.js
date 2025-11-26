import express from 'express';
import AttachmentsController from '../controllers/attachments.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

/**
 * @openapi
 * /api/attachments:
 *   get:
 *     summary: Get all attachments (metadata only)
 *     tags:
 *       - Attachments
 *     responses:
 *       200:
 *         description: List of attachments
 *   post:
 *     summary: Upload an attachment
 *     tags:
 *       - Attachments
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - entity_name
 *               - entity_id
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               entity_name:
 *                 type: string
 *                 example: INQUIRY
 *               entity_id:
 *                 type: integer
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: Inspection report PDF
 *               uploaded_by_rep_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Attachment created
 */
router.get('/', AttachmentsController.getAll);
router.post('/', upload.single('file'), AttachmentsController.upload);

/**
 * @openapi
 * /api/attachments/{id}:
 *   get:
 *     summary: Get attachment metadata by ID
 *     tags:
 *       - Attachments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attachment metadata
 *       404:
 *         description: Attachment not found
 *   delete:
 *     summary: Delete an attachment
 *     tags:
 *       - Attachments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Attachment deleted
 *       404:
 *         description: Attachment not found
 */
router.get('/:id', AttachmentsController.getById);
router.delete('/:id', AttachmentsController.delete);

/**
 * @openapi
 * /api/attachments/entity/{entityName}/{entityId}:
 *   get:
 *     summary: Get attachments for a specific entity
 *     tags:
 *       - Attachments
 *     parameters:
 *       - name: entityName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: INQUIRY
 *       - name: entityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: List of attachments for the entity
 */
router.get('/entity/:entityName/:entityId', AttachmentsController.getByEntity);

/**
 * @openapi
 * /api/attachments/{id}/file:
 *   get:
 *     summary: Download attachment file
 *     tags:
 *       - Attachments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Binary file content
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Attachment or file data not found
 */
router.get('/:id/file', AttachmentsController.download);

export default router;
