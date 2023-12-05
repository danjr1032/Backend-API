
const express = require ('express');
const { createRequest, getUserRequests, getAllRequests } = require('../controller/Request.controller');

const requestRouter = express.Router();


requestRouter.post('/send', createRequest);
requestRouter.get('/requests', getAllRequests);
requestRouter.get('/viewRequests', getUserRequests);






module.exports = requestRouter;
