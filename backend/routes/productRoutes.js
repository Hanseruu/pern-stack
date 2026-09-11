import express from 'express';
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct} from '../controllers/productController.js';

const router = express.Router()

router.get("/products", getProducts);
router.get("/products/:id", getProduct)
router.post("/products/create", createProduct);
router.put("/products/update/:id", updateProduct);
router.delete("/products/delete/:id", deleteProduct);

export default router;