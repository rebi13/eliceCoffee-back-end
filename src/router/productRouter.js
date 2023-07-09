const { Router } = require("express");
const productService = require("../services/productService");
const utils = require("../misc/utils");
const router = Router();

router.get("/", async (req, res, next) => {
  // const {"검색조건", "카테고리" 등}
  try {
    const products = await productService.getProducts();
    res.json(utils.buildResponse(products));
  } catch (err) {
    next(err);
  }
})

router.get("/:productId", async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await productService.getProduct(productId);
        res.json(utils.buildResponse(product));
    } catch (err) {
        next(err);
    }
})

module.exports = router;
