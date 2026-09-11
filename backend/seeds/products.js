import {sql} from '../config/db.js'


const SAMPLE_PRODUCTS = [
    {
        name:"Black wireless headphones",
        price: 39,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
         name:"White wireless mouse",
        price: 19,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1028&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    },

    {
         name:"Akko Keyboard",
        price: 59,
        image: "https://images.unsplash.com/photo-1635987391914-cb84b567e68f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    
    {
         name:"Black and white monitor 144hz",
        price: 199,
        image: "https://images.unsplash.com/photo-1551645120-d70bfe84c826?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    
    {
         name:"Canon Microphone",
        price: 99,
        image: "https://images.unsplash.com/photo-1583665606514-e0f81cc5cded?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    
    {
         name:"Gaming Case with multiple fans",
        price: 89,
        image: "https://plus.unsplash.com/premium_photo-1671439135739-96bbe677c38c?q=80&w=683&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    
    {
         name:"White Applewatch",
        price: 249,
        image: "https://images.unsplash.com/photo-1675535350277-6fdb9948bfcb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    
    {
         name:"Custom Iphone case",
        price: 9,
        image: "https://images.unsplash.com/photo-1623393945964-8f5d573f9358?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    
    {
         name:"Original Huawei Phone Charger",
        price: 99,
        image: "https://images.unsplash.com/photo-1725304382197-663ae3864750?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

]

async function seedProducts() {


    try {
            //First Clean the Database if has any products

    await sql`TRUNCATE TABLE products RESTART IDENTITY`

            //Insert all the products:
        for(const product of SAMPLE_PRODUCTS ) {
            await sql`INSERT INTO products (name, price, image)
                      VALUES(${product.name}, ${product.price}, ${product.image})`;
        }
        console.log("Database seeded successfully");
        process.exit(0)
    } catch (err) { 
        console.log("Error seeding Database", err);
        process.exit(1);
    }
}

seedProducts();