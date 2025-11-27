import express from 'express';
import InquiriesController from '../controllers/inquiries.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/inquiries:
 *   get:
 *     summary: Get all inquiries
 *     tags:
 *       - Inquiries
 *     responses:
 *       200:
 *         description: List of inquiries
 *   post:
 *     summary: Create a new inquiry
 *     tags:
 *       - Inquiries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location_id
 *               - rep_id
 *             properties:
 *               location_id:
 *                 type: integer
 *                 example: 1
 *               rep_id:
 *                 type: integer
 *                 example: 1
 *               inquiry_channel:
 *                 type: string
 *                 example: Phone
 *               status:
 *                 type: string
 *                 example: OPEN
 *               inspection_required:
 *                 type: boolean
 *                 example: true
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inquiry created
 */
router.get('/', InquiriesController.getAll);
router.post('/', InquiriesController.create);

/**
 * @openapi
 * /api/inquiries/{id}:
 *   get:
 *     summary: Get an inquiry by ID
 *     tags:
 *       - Inquiries
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inquiry found
 *       404:
 *         description: Inquiry not found
 *   put:
 *     summary: Update an inquiry
 *     tags:
 *       - Inquiries
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Inquiry updated
 *       404:
 *         description: Inquiry not found
 *   delete:
 *     summary: Delete an inquiry
 *     tags:
 *       - Inquiries
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Inquiry deleted
 *       404:
 *         description: Inquiry not found
 */
router.get('/:id', InquiriesController.getById);
router.put('/:id', InquiriesController.update);
router.delete('/:id', InquiriesController.delete);

export default router;
