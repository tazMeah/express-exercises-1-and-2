import express from "express";
import shops from "../models/shops";
const routes = express.Router();

// API
routes.get("/api/shops", (req, res) => {
    const minRating = Number(req.query.minRating);

    if (minRating) {
        res.json(shops.filter(shop => shop.rating >= minRating));
    } else {
        res.json(shops);
    }
})

routes.get("/api/shops/:id", (req, res) => {
    const id = Number(req.params.id);
    const foundShop = shops.find(shop => shop.id === id);

    if (foundShop) {
        res.json(foundShop);
    } else {
        res.json({ "error": `Shop not found: ${req.params.id}` });
    }

})



// Web App

routes.get("/", (req, res) => {
    res.render("home");
})

routes.get("/shop-list", (req, res) => {
    const minRating = Number(req.query.minRating);
    let filteredShops = shops;

    if (minRating){
        filteredShops = shops.filter(shop => shop.rating >= minRating);
    }

    res.render("shop-list", { filteredShops });

})

routes.get("/shop-details/:id", (req, res) => {
    const id = Number(req.params.id);
    // in case there is no match
    const searchedID = req.params.id;
    const shop = shops.find(shop => shop.id === id);

    res.render("shop-details", { shop, searchedID });
})

routes.get("/shop-search-form", (req, res) => {
    res.render("shop-search-form");
})

export default routes;