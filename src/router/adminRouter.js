const { Router } = require("express");
const adminService = require("../services/adminService");
const utils = require("../misc/utils");
const { asyncHandler, validator } = require("../middlewares");
const { emailCheck } = require("../middlewares/validator");
const router = Router();

// 상품 등록
router.post("/products", asyncHandler(async (req, res, next) => {
  const { id, name, categoryId, price, subImage, keyWord, description, mainImage } = req.body;
  const product = await adminService.addProduct({
    id, name, categoryId, price, subImage, keyWord, description, mainImage
  });
  res.json(utils.buildResponse(product));
})
);

// 특정 상품 정보 가져오기 (수정페이지 접근시)
router.get("/products/:id", asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await adminService.getProduct(id);
  console.log(product);
  res.json(utils.buildResponse(product));
})
);

// 상품 정보 변경하기 (수정)
router.put("/products/:id", asyncHandler(async (req, res, next) => {
  const { id, name, categoryId, price, subImage, keyWord, description, mainImage } = req.body;
  const product = await adminService.putProduct({
    id, name, categoryId, price, subImage, keyWord, description, mainImage
  });
  res.json(utils.buildResponse(product));
})
);

// 상품 단건 삭제하기
router.delete("/products/:id", asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await adminService.deleteProduct(id);
  res.json(utils.buildResponse(product));
})
);

// 주문 내역 확인하기 (사용자 전체)
router.get("/orders", asyncHandler(async (req, res, next) => {
  const orders = await adminService.getOrders();
  res.json(utils.buildResponse(orders));
})
);

// 주문 내역 확인하기 (특정 사용자)
router.get("/orders/:id", asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await adminService.getOrder(id);
  res.json(utils.buildResponse(order));
})
);

// 특정 주문 내역 삭제하기 (orderId)
router.delete("/orders/:id", asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await adminService.deleteOrder(id);
  res.json(utils.buildResponse(order));
})
);

// 카테고리 추가
router.post('/categories', [validator.idCheck, validator.nameCheck, validator.validatorError], asyncHandler(async (req, res, next) => {
  const { id, name } = req.body;
  const newCategory = await adminService.addCategory({ id, name });
  res.json(utils.buildResponse(newCategory));
}));

//카테고리 조회
router.get("/categories/:id", [validator.paramIdCheck, validator.validatorError], asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await adminService.getCategory(id);
  res.json(utils.buildResponse(category))
}));

//카테고리 수정
router.put("/categories/:id", [validator.paramIdCheck, validator.nameCheck, validator.validatorError], asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await adminService.putCategory({ id, name });
  res.json(utils.buildResponse(category));
}))

//카테고리 삭제
router.delete('/categories/:id', [validator.paramIdCheck, validator.validatorError], asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await adminService.deleteCategory(id);
  res.json(utils.buildResponse(category))
}))

// 주문상태 수정
router.put("/orders/:id", asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await adminService.putStatus(id, status);
  res.json(utils.buildResponse(order));
})
);

module.exports = router;
