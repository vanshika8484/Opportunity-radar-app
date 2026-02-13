import express from "express";
import { ENV } from "./config/env.js";
 import { db } from "./config/db.js";
  import { favorites } from "./db/schema.js";
 import { and, eq } from "drizzle-orm";
  import job from "./config/cron.js";
const app=express();
const PORT=ENV.PORT;

if(ENV.NODE_ENV==="production"){
    job.start();
}
app.use(express.json());
app.get("/api/health",(req,res)=>{
    res.status(200).json({success:true});
})

app.post("/api/favorites",async(req,res)=>{
   try{
     const {name,email,jobTitle}=req.body;
    if(!name|| !email || ! jobTitle){
        return res.status(400).json({error:"Missing required fields"});
    };
    const newFavorite=await db.insert(favorites).values({
        name,email,jobTitle}).returning();
    res.status(201).json(newFavorite[0]);
}
   
catch(error){
    console.error("Error adding favorite:",error);
    res.status(500).json({error:"Failed to add favorite"});
}
})
 app.delete("/api/favorites/:name/:email/",async(req,res)=>{
try{
    const {name,email}=req.params;
    const deletedFavorite=await db.delete(favorites).where(and(eq(favorites.name,name),eq(favorites.email,email)));
    res.status(200).json({message:"Favorite deleted successfully"});
}
catch(error){
    console.error("Error deleting favorite:",error);
    res.status(500).json({error:"Failed to delete favorite"});
}
})
app.get("/api/favorites/:name/:email",async(req,res)=>{
    try{
        const {name,email}=req.params;
        const userFavorites=await db.select().from(favorites).where(eq(favorites.name,name),eq(favorites.email,email));
        res.status(200).json(userFavorites);
    }
    catch(error){
        console.error("Error fetching favorites:",error);
        res.status(500).json({error:"Failed to fetch favorites"});
    }
})
app.listen(PORT,()=>{
    console.log("server started",PORT);
})