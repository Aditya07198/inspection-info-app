import express from 'express';
import InspectionOrdersController from '../controllers/inspectionOrders.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/inspection-orders:
 *   get:
 *     summary: Get all inspection orders
 *     tags:
 *       - InspectionOrders
 *     responses:
 *       200:
 *         description: List of inspection orders
 *   post:
 *     summary: Create a new inspection order
 *     tags:
 *       - InspectionOrders
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
 *               inquiry_id:
 *                 type: integer
 *                 example: 1
 *               scheduled_date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 example: OPEN
 *               inspection_type:
 *                 type: string
 *               next_due_date:
 *                 type: string
 *                 format: date
 *               followup_start_date:
 *                 type: string
 *                 format: date
 *               invoice_raised:
 *                 type: boolean
 *               invoice_amount:
 *                 type: number
 *                 format: float
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inspection order created
 */
router.get('/', InspectionOrdersController.getAll);
router.post('/', InspectionOrdersController.create);

/**
 * @openapi
 * /api/inspection-orders/{id}:
 *   get:
 *     summary: Get an inspection order by ID
 *     tags:
 *       - InspectionOrders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inspection order found
 *       404:
 *         description: Inspection order not found
 *   put:
 *     summary: Update an inspection order
 *     tags:
 *       - InspectionOrders
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
 *         description: Inspection order updated
 *       404:
 *         description: Inspection order not found
 *   delete:
 *     summary: Delete an inspection order
 *     tags:
 *       - InspectionOrders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Inspection order deleted
 *       404:
 *         description: Inspection order not found
 */
router.get('/:id', InspectionOrdersController.getById);
router.put('/:id', InspectionOrdersController.update);
router.delete('/:id', InspectionOrdersController.delete);

export default router;
