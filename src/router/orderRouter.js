const { Router } = require("express");
const { OrderService, UserService } = require("../services");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const id = req.currentUserId;
    const orderInfo = await OrderService.getOrderInfo(id);
    res.status(201).json(orderInfo);

    // const myOrders = await UserService.getMyInfo(id).orderList;
    // console.log(myOrders);
    // const products = [];
    // myOrders.forEach(async el => {
    //     // 배열에 있는 주문id를 하나씩 foreach 돌려서 배열에 담는다.
    //     let data = await OrderService.getOrderInfo(el);
    //     products.push(data);
    // })
    // // 담은 배열은 주문id로 이루어진 배열이다.
  } catch (err) {
    next(err);
  }
});



module.exports = router;
