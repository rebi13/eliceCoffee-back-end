const { model } = require("mongoose");
const CategorySchema = require("../schemas/CategorySchema");

const Category = model("categories", CategorySchema);

class CategoryModel {
    async create(category) {
        return await Category.create(category);
    }
}

module.exports = new CategoryModel();