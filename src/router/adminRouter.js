const { Router } = require("express");
const  adminService = require("../services/adminService");
const { AdminService } = require("../services");
const utils = require("../misc/utils");
const router = Router();

// 상품 등록
router.post("/products", async (req, res, next) => {
  const { id, name,
    categoryId,
    price,
    subImage,
    keyWord,
    description,
    mainImage } = req.body;
  const product = await adminService.addProduct({
    id, name,
    categoryId,
        price,
        subImage,
        keyWord,
        description,
        mainImage
  });
  res.json(utils.buildResponse(product));
});

router.get("/", async (req, res, next) => {
  // const {"검색조건", "카테고리" 등}
})

module.exports = router;
