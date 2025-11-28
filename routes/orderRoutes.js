import express from 'express'

import {placeOrder,placeOrderStripe,userOrders,allOrders,updateStatus,verifyStripe} from '../controllers/orderController.js'

import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'

const orderRouter=express.Router();

// Admin routes
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment routes
orderRouter.post('/place',authUser,placeOrder);//for cod
orderRouter.post('/stripe',authUser,placeOrderStripe)
// orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user routes
orderRouter.post('/userorders',authUser,userOrders)

// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;