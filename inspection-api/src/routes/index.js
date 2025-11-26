import express from 'express';
import repsRoutes from './reps.routes.js';
import locationsRoutes from './locations.routes.js';
import inquiriesRoutes from './inquiries.routes.js';
import inspectionOrdersRoutes from './inspectionOrders.routes.js';
import followupsRoutes from './followups.routes.js';
import attachmentsRoutes from './attachments.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Inspection API root',
    timestamp: new Date().toISOString()
  });
});

router.use('/reps', repsRoutes);
router.use('/locations', locationsRoutes);
router.use('/inquiries', inquiriesRoutes);
router.use('/inspection-orders', inspectionOrdersRoutes);
router.use('/followups', followupsRoutes);
router.use('/attachments', attachmentsRoutes);

export default router;
