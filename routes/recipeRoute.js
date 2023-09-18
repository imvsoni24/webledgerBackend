const express = require("express");
const recipeRouter = express.Router()
const axios = require("axios");
const { RecipeModel } = require("../models/recipe");
const apiKey = "c50b7d85f28d470ab282bb7dc146ad14"

recipeRouter.get("/search",async(req,res)=>{
    try{
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${req.query.query}`)
        res.json(response.data.results)
    }
    catch(e){
        res.json(e)
    }
})

recipeRouter.get("/details/:id",async(req,res)=>{
  console.log(req.params.id)
  try{
    const response = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${apiKey}`)
    res.json(response.data)
  }
  catch(e){
    res.json(e)
  }
})

recipeRouter.post("/save",async(req,res)=>{
    try {
        const { id, title, image } = req.body;
    
        const existingRecipe = await RecipeModel.findOne({ recipeId: id});
    
        if (existingRecipe) {
          return res.json({ message: "Recipe already saved" });
        }
    
        const newRecipe = new RecipeModel({
          recipeId: id,
          title,
          image,
        });
    
        await newRecipe.save();
    
        res.json({ message: "Recipe saved successfully" });
      } catch (e) {
        res.json({ message: "Couldn't save the recipe" });
      }
})

recipeRouter.get("/saved",async(req,res)=>{
    try {
        const savedRecipes = await RecipeModel.find();
        res.json(savedRecipes);
      } catch (e) {
        res.json(e);
      }
})

module.exports= {
    recipeRouter
}