import express from 'express';
import LocationsController from '../controllers/locations.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     tags:
 *       - Locations
 *     responses:
 *       200:
 *         description: List of locations
 *   post:
 *     summary: Create a new location
 *     tags:
 *       - Locations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location_name
 *             properties:
 *               location_name:
 *                 type: string
 *                 example: ABC Manufacturing
 *               address_1:
 *                 type: string
 *               city:
 *                 type: string
 *                 example: Toronto
 *               country:
 *                 type: string
 *                 example: Canada
 *     responses:
 *       201:
 *         description: Location created
 */
router.get('/', LocationsController.getAll);
router.post('/', LocationsController.create);

/**
 * @openapi
 * /api/locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags:
 *       - Locations
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location found
 *       404:
 *         description: Location not found
 *   put:
 *     summary: Update a location
 *     tags:
 *       - Locations
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
 *         description: Location updated
 *       404:
 *         description: Location not found
 *   delete:
 *     summary: Delete a location
 *     tags:
 *       - Locations
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Location deleted
 *       404:
 *         description: Location not found
 */
router.get('/:id', LocationsController.getById);
router.put('/:id', LocationsController.update);
router.delete('/:id', LocationsController.delete);

export default router;
