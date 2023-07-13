const { Router } = require('express');
const { orderService } = require('../services');
const { isAuthenticated, asyncHandler, validator } = require('../middlewares');
const utils = require('../misc/utils');
const router = Router();

// 사용자의 주문 전체 정보 (목록)
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const orders = await orderService.getOrders(userId);
    res.json(utils.buildResponse(orders));
  })
);

// 사용자의 특정 주문 정보 (상세)
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const { id } = req.params;
    const order = await orderService.getOrder(userId, id);
    res.json(utils.buildResponse(order));
  })
);

// 주문 취소
router.put(
  '/:orderId',
  [validator.putOrderCheck, validator.validatorError],
  asyncHandler(async (req, res, next) => {
    // id 이중검증 필요..?
    const { orderId } = req.params;
    const { address, receiver, receiverPhone } = req.body;
    const data = await orderService.putOrder(orderId, { address, receiver, receiverPhone });
    res.json(utils.buildResponse(data));
  })
);

router.put('/:orderId/cancel', asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const data = await orderService.putStatus(orderId, { status: 'pending' });
  res.json(utils.buildResponse(data));
}))

// 주문하기
router.post(
  '/',
  [validator.postOrderCheck, validator.validatorError],
  asyncHandler(async (req, res, next) => {
    const { items, itemTotal, userId, address, receiver, receiverPhone } = req.body;
    const data = await orderService.postOrder({
      items,
      itemTotal,
      userId,
      address,
      receiver,
      receiverPhone,
      status: "paid",
    });
    res.json(utils.buildResponse(data));
  })
);

module.exports = router;
