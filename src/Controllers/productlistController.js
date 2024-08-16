const Productlist = require('../Modules/productlistModule');
const productlistController = {};

productlistController.addProduct = async (req, res) => {
    try {
        const { productID, name, price, description, image, stockQuantity, category, discount } = req.body;
        const product = new Productlist({ productID, name, price, description, image, stockQuantity, category, discount });
        await product.save();
        res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
productlistController.getProduct = async (req, res) => {
    try {
        const products = await Productlist.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.productlistController = productlistController;