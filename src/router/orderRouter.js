const { Router } = require("express");
const { orderService } = require("../services");
const utils = require("../misc/utils");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const id = req.currentUserId;
    const orderInfo = await orderService.getOrderInfo(id);
    // res.status(201).json(orderInfo);
    res.json(utils.buildResponse(orderInfo));

    // const myOrders = await UserService.getMyInfo(id).orderList;
    // console.log(myOrders);
    // const products = [];
    // myOrders.forEach(async el => {
    //     // 배열에 있는 주문id를 하나씩 foreach 돌려서 배열에 담는다.
    //     let data = await orderService.getOrderInfo(el);
    //     products.push(data);
    // })
    // // 담은 배열은 주문id로 이루어진 배열이다.
  } catch (err) {
    next(err);
  }
});

// 주문 취소
router.put("/:orderId", async (req, res, next) => {
  try {
    const id = req.currentUserId;
    const { orderId } = req.params;
    // 주소데이터가 안들어오면 배송상태 수정. pending 추가?
    const param = "pending"; // address ?? "pending";
    const data = await orderService.putOrderCancel(orderId, { param });
    res.json(utils.buildResponse(data));
  } catch (err) {
    next(err);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = router;
