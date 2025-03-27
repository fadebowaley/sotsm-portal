const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, ownerCreate } = require('../services');
const { User } = require('../models');

const ownerCreate = catchAsync(async (req, res) => {
  const user = await userService.ownerCreate(req.body);
  //const tokenverify = await tokenService.verifyToken(token)
  res.status(httpStatus.CREATED).send({ user });
});


module.exports = { ownerCreate };
