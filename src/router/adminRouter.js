const { Router } = require("express");
const adminService = require("../services/adminService");
const utils = require("../misc/utils");
const { asyncHandler } = require("../middlewares");
const router = Router();

// 상품 등록
router.post("/products", asyncHandler( async (req, res, next) => {
  const { id, name, categoryId, price, subImage, keyWord, description, mainImage } = req.body;
  const product = await adminService.addProduct({
    id, name, categoryId, price, subImage, keyWord, description, mainImage
  });
  res.json(utils.buildResponse(product));
})
);

// 특정 상품 정보 가져오기 (수정페이지 접근시)
router.get("/products/:id", asyncHandler( async (req, res, next) => {
  const { id } = req.params;
  const product = await adminService.getProduct(id);
  console.log(product);
  res.json(utils.buildResponse(product));
})
);

// 상품 정보 변경하기 (수정)
router.put("/products/:id", asyncHandler( async (req, res, next) => {
  const { id, name, categoryId, price, subImage, keyWord, description, mainImage } = req.body;
  const product = await adminService.putProduct({
    id, name, categoryId, price, subImage, keyWord, description, mainImage
  });
  res.json(utils.buildResponse(product));
})
);

// 상품 단건 삭제하기
router.delete("/products/:id", asyncHandler( async (req, res, next) => {
  const { id } = req.params;
  const product = await adminService.deleteProduct(id);
  res.json(utils.buildResponse(product));
})
);

module.exports = router;
