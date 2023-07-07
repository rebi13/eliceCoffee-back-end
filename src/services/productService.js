const productModel = require("../db/models");
const { hashPassword } = require("../middlewares");

class productService {
  constructor(userModel) {
    this.productModel = productModel;
  }
    // 특정 id를 갖는 하나의 게시글을 가져오는 메소드
    async getProduct(id) {
        // 아래 계층에 있는 DAO를 호출!
        const post = await this.productModel.findOne(id);
        return post;
    }
    // 특정 조건(title과 author)에 맞는 여러 개의 게시글을 가져오는 메소드
    async getProducts() { // { title, author }
        const posts = await this.productModel.findMany();
        return posts;
    }
}

module.exports = new productService(productModel);
