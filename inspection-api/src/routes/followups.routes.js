import express from 'express';
import FollowupsController from '../controllers/followups.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/followups:
 *   get:
 *     summary: Get all followups
 *     tags:
 *       - Followups
 *     responses:
 *       200:
 *         description: List of followups
 *   post:
 *     summary: Create a new followup
 *     tags:
 *       - Followups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inspection_order_id
 *               - rep_id
 *               - followup_type
 *             properties:
 *               inspection_order_id:
 *                 type: integer
 *                 example: 1
 *               rep_id:
 *                 type: integer
 *                 example: 1
 *               followup_type:
 *                 type: string
 *                 example: CALL
 *               followup_status:
 *                 type: string
 *                 example: PENDING
 *               due_date:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Followup created
 */
router.get('/', FollowupsController.getAll);
router.post('/', FollowupsController.create);

/**
 * @openapi
 * /api/followups/{id}:
 *   get:
 *     summary: Get a followup by ID
 *     tags:
 *       - Followups
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Followup found
 *       404:
 *         description: Followup not found
 *   put:
 *     summary: Update a followup
 *     tags:
 *       - Followups
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
 *         description: Followup updated
 *       404:
 *         description: Followup not found
 *   delete:
 *     summary: Delete a followup
 *     tags:
 *       - Followups
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Followup deleted
 *       404:
 *         description: Followup not found
 */
router.get('/:id', FollowupsController.getById);
router.put('/:id', FollowupsController.update);
router.delete('/:id', FollowupsController.delete);

export default router;
