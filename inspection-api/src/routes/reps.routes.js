import express from 'express';
import RepsController from '../controllers/reps.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/reps:
 *   get:
 *     summary: Get all reps
 *     tags:
 *       - Reps
 *     responses:
 *       200:
 *         description: List of reps
 *   post:
 *     summary: Create a new rep
 *     tags:
 *       - Reps
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: "123-456-7890"
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: Rep created
 */
router.get('/', RepsController.getAll);
router.post('/', RepsController.create);

/**
 * @openapi
 * /api/reps/{id}:
 *   get:
 *     summary: Get a rep by ID
 *     tags:
 *       - Reps
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rep found
 *       404:
 *         description: Rep not found
 *   put:
 *     summary: Update a rep
 *     tags:
 *       - Reps
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
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rep updated
 *       404:
 *         description: Rep not found
 *   delete:
 *     summary: Delete a rep
 *     tags:
 *       - Reps
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Rep deleted
 *       404:
 *         description: Rep not found
 */
router.get('/:id', RepsController.getById);
router.put('/:id', RepsController.update);
router.delete('/:id', RepsController.delete);

export default router;
