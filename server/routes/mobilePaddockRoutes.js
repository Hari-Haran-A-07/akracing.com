import express from 'express';

const router = express.Router();

// GET /api/mobile/sync - Pairing state for akr-pitwall-mobile
router.get('/sync', (req, res) => {
  res.json({
    success: true,
    repository: 'akr-pitwall-mobile',
    status: 'READY_TO_PAIR',
    activeSessions: 3,
    pairingToken: 'AKR-MOBILE-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    supportedChannels: ['pit-radio', 'telemetry-mirror', 'tire-scanner'],
  });
});

// POST /api/mobile/tire-scan - Ingest barcode/infrared tire data from mobile handheld
router.post('/tire-scan', (req, res) => {
  const { barcode, compound, initialPressurePsi } = req.body;
  res.status(201).json({
    success: true,
    message: 'Tire set logged into pit allocation database',
    tireSetId: barcode || 'TIRE-SET-07',
    compound: compound || 'MEDIUM_SLICK',
    registeredAt: new Date().toISOString(),
  });
});

export default router;
