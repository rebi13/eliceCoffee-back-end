const { Router } = require('express');
const { productService } = require('../services');
const { asyncHandler } = require('../middlewares');
const utils = require('../misc/utils');
const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const categoryId = req.query.categoryId;
    // 카테고리id가 존재하면 해당 id에 대한 항목만 검색. 아니면 전체 검색한다.
    const products = categoryId
      ? await productService.getProductsByCategoryId(categoryId)
      : await productService.getProducts();
    res.json(utils.buildResponse(products));
  })
);

router.get(
  '/:productId',
  asyncHandler(async (req, res, next) => {
    const productId = req.params.productId;
    const product = await productService.getProduct(productId);
    res.json(utils.buildResponse(product));
  })
);

module.exports = router;
