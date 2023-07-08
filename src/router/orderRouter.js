const { Router } = require("express");
const orderService = require("../services/orderService");
const { isAuthenticated, asyncHandler } = require("../middlewares");
const utils = require("../misc/utils");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const id = req.body.userId;
    // const id2 = req.currentUserId;
    const orderInfo = await orderService.getOrderInfo(id);
    res.json(utils.buildResponse(orderInfo));

  } catch (err) {
    next(err);
  }
});

// 주문 취소
router.put("/:orderId", isAuthenticated, async (req, res, next) => {
  try {
    // id 이중검증 필요..?
    const { orderId } = req.params;
    const { address, flag } = req.body;
    let param;
    if(flag) {
      // 주문 취소
      param = {status: "pending"};
    }
    else {
      // 배송지 변경
      param = {address};
    }

    const data = await orderService.putOrder(orderId, param);
    res.json(utils.buildResponse(data));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { id, items, itemTotal, userId, address, receiver, status } = req.body;
 
    if (!id || !items || !itemTotal || !userId || !address || !receiver || !status) {
      throw new Error("필수 정보를 모두 입력해주세요.");
    }
    
    const data = await orderService.postOrder({ id, items, itemTotal, userId, address, receiver, status });

    res.json(utils.buildResponse(data));

    return data;
  } catch (err) {
    next(err);
  }
});


module.exports = router;
