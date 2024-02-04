const Order = require("../models/Order");
const Product = require("../models/Product");
const stripe = require("stripe");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee"
    );
  }
  let orderItems = [];
  let subtotal = 0;
  for (item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }
    const { name, price, _id, image } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      product: _id,
      image,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal = +item.amount * price;
  }
  const total = subtotal + shippingFee + tax;
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};
const getSingleOrder = async (req, res) => {
  const orderID = req.params.id;
  const order = await Order.findOne({ _id:orderID});
  if(!order){
    throw new CustomError.NotFoundError(`No order with id :${orderID }`)
  }
  checkPermissions(req.user,order.user)
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  user = req.user.userId
  const orders = await Order.find({user});
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};
const updateOrder = async (req, res) => {
  const orderID = req.params.id;
  
  const order = await Order.findOne({ _id:orderID});
  if(!order){
    throw new CustomError.NotFoundError(`No order with id :${orderID }`)
  }
  checkPermissions(req.user,order.user)
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
