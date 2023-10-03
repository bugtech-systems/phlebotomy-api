const express = require('express');
const router = express.Router();
const samsara = require('../controllers/samsara');

// Driver
router.post('/driver', samsara.createDriver);
router.get('/drivers', samsara.getDrivers);
router.get('/driver/:id', samsara.getDriver);
router.patch('/driver/:id', samsara.updateDriver)

// Dirver-Vehicle Assignments
router.post('/driver/vehicle/assignment', samsara.createDriverVehicleAssignment)
router.delete('/driver/vehicle/assignment', samsara.deleteDriverVehicleAssignment)
router.get('/driver/vehicle/assignments', samsara.getDriverVehicleAssignments)
router.patch('/driver/:id/vehicle/assignments', samsara.updateDriverVehicleAssignment)

// Vehicle Stats
router.get('/vehicle', samsara.feedStats)
router.get('/vehicle/stats', samsara.snapStats)



module.exports = router;