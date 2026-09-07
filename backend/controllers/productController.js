
import {sql} from '../config/db.js'

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: "error on server"})
    }
}

export const getProduct = async (req, res) => {
   
    const { id } = req.params
    
    try {
        const productById = await sql`
            SELECT * FROM products
            WHERE id = ${id}
        `
        res.status(200).json({success: true, message: "Product fetched by id", data: productById[0]})
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: "Error getting that product by id"})
    }
   
}

export const createProduct = async (req, res) => {
    const {name, price, image } = req.body

    if (!name || !price || !image) { 
        res.status(400).json({success: false, message:"All fields are required"})
    }

    try {
        const newProduct = await sql`
            INSERT INTO products (name, price, image)
            VALUES (${name}, ${price}, ${image})
            RETURNING *
        `;
        // POSTMAN 
        res.status(201).json({success: true, message: "New product created successfully", data: newProduct[0]})

    } catch (error) {
         console.log("error", error);
        res.status(500).json({success: false, message: "error on create Product function"})
    }
}

export const updateProduct = async (req, res) => {
   
    const { id } = req.params;
    const {name, price, image} = req.body;

    try {
        const updateProduct = await sql`
            UPDATE products
            SET name=${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING *
        `
        if (updateProduct.length === 0) return res.status(404).json({success: false, message: "Product Not Found"})
        res.status(200).json({success: true, message: "Product successfully updated", data: updateProduct[0]})
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: "Error updating that product by id"})
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
    const deleteProduct = await sql`
            DELETE FROM products
            WHERE id=${id} 
            RETURNING *
   `;
   // if not found
   if (deleteProduct.length === 0 ) {
        return res.status(404).json({success: false, message: "Product Not found"})
   }
   res.status(200).json({success: true, message: "Product deleted successfully", data: deleteProduct[0]})
    
    } catch (error) {
        console.log("error", error);
        res.status(400).json({success: false, message: "Couldn't delete product"})
    }

}