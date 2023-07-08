const { model } = require("mongoose");
const CategorySchema = require("../schemas/CategorySchema");

const Category = model("categories", CategorySchema);

class CategoryModel {
    // 카테고리 생성
    async create(category) {
        return await Category.create(category);
    }
    // 카테고리id로 조회
    async findById(id) {
        return await Category.findOne({ id: id });
    }
    // 카테고리 이름으로 조회
    async findByName(name) {
        return await Category.findOne({ name: name });
    }
}

module.exports = new CategoryModel();