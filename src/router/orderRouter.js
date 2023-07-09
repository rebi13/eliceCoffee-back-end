const { Router } = require('express');
const jwt = require('jsonwebtoken');
const orderService = require('../services/orderService');
const { isAuthenticated, asyncHandler } = require('../middlewares');
const utils = require('../misc/utils');
const router = Router();

// 사용자의 주문 전체 정보 (목록)
router.get('/', isAuthenticated, async (req, res, next) => {
  const userId = req.userId;
  console.log(userId);
  const orders = await orderService.getOrders(userId);
  res.json(utils.buildResponse(orders));
});

// 사용자의 특정 주문 정보 (상세)
router.get(
  '/:id',
  isAuthenticated,
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
  isAuthenticated,
  asyncHandler(async (req, res, next) => {
    try {
      // id 이중검증 필요..?
      const { orderId } = req.params;
      const { address, isOrderCancel } = req.body;
      let data;
      if (isOrderCancel) {
        // 주문 취소
        data = await orderService.putStatus(orderId, { status: 'pending' });
      } else {
        // 배송지 변경
        data = await orderService.putOrder(orderId, { address, receiver });
      }
      res.json(utils.buildResponse(data));
    } catch (err) {
      next(err);
    }
  })
);

// 주문하기
router.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res, next) => {
    try {
      const { id, items, itemTotal, userId, address, receiver, status } = req.body;

      if (!id || !items || !itemTotal || !userId || !address || !receiver || !status) {
        throw new Error('필수 정보를 모두 입력해주세요.');
      }
      const data = await orderService.postOrder({ id, items, itemTotal, userId, address, receiver, status });

      res.json(utils.buildResponse(data));

      return data;
    } catch (err) {
      next(err);
    }
  })
);

module.exports = router;
