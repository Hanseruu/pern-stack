import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import {sql} from "./config/db.js"
import cors from 'cors'
import productRoutes from './routes/productRoutes.js';
import path from "path";
import { fileURLToPath } from "url";


// import aj from './lib/arcjet.js'
const app = express();

app.use(express.json());
app.use(cors());
app.use(
    helmet({
    contentSecurityPolicy: false,
})); // Helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests


const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(async (req, res, next) => {
//   try {
//     const decision = await aj.protect(req, {
//       requested: 1, // specifies that each request consumes 1 token
//     });

//     if (decision.isDenied()) {
//       if (decision.reason.isRateLimit()) {
//         res.status(429).json({ error: "Too Many Requests" });
//       } else if (decision.reason.isBot()) {
//         res.status(403).json({ error: "Bot access denied" });
//       } else {
//         res.status(403).json({ error: "Forbidden" });
//       }
//       return;
//     }

//     // check for spoofed bots
//     if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
//       res.status(403).json({ error: "Spoofed bot detected" });
//       return;
//     }

//     next();
//   } catch (error) {
//     console.log("Arcjet error", error);
//     next(error);
//   }
// });

app.use('/api', productRoutes);

if (process.env.NODE_ENV === "production") {
    // serve our react app

    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/*splat", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
};




async function initDB(){

    try {
            // This tagged temple literal we just created on db.js to write SQL Querys
        await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
        )
        `
    console.log(`Db initialized successfully`);

    } catch (error) {
        console.log("Error initializing database", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server listening on PORT: http://localhost:${PORT}`);
    });
});