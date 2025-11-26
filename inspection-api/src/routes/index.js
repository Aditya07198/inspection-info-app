import express from 'express';

const router = express.Router();

// placeholder route so /api responds
router.get('/', (req, res) => {
  res.json({
    message: 'Inspection API root',
    timestamp: new Date().toISOString()
  });
});

export default router;
