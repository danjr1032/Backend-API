
const express = require ('express');
const { createRequest, getUserRequests, getAllRequests } = require('../controller/Request.controller');

const requestRouter = express.Router();


requestRouter.post('/send/:id', createRequest);
requestRouter.get('/viewRequests/:id', getUserRequests);






module.exports = requestRouter;
