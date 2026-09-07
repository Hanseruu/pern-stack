import express from 'express';
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct} from '../controllers/productController.js';

const router = express.Router()

router.get("/", getProducts);
router.get("/:id", getProduct)
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;