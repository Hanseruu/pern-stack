import arcjet, {tokenBucket, shield, detectBot } from "@arcjet/node";
// Archivo aparte lib donde va arcjet para rate limiting y detectBots 

import "dotenv/config";

//init arcjet

export const aj = arcjet({
    key: process.env.ARCJET_KEY, 
    // we need to keep track of the requests by the ip address
    characteristics: ["ip.src"],
    rules: [
        // shield protects your app from common attacks e.g. SQL injection, XSS, CSRF attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            // Block all the Bots except search engine
            allow: [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),

        // Rate Limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20,
        }),
    ],
});