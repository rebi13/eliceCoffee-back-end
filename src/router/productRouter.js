const { Router } = require("express");
const { productService } = require("../services");
const utils = require("../misc/utils");
const router = Router();

router.get("/", async (req, res, next) => {
  // const {"검색조건", "카테고리" 등}
  try {
    const products = await productService.getPosts();
    res.json(utils.buildResponse(products));
  } catch (err) {
    next(err);
  }
})

module.exports = router;
