
const express = require ('express');
const { requestPickup, getAllPickups } = require('../controller/pickup.controller');

const pickupRouter = express.Router();


pickupRouter.get('/pickups', getAllPickups);

pickupRouter.post('/request', requestPickup);

module.exports = pickupRouter;
