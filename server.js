const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use('/uploads', express.static('uploads'));


const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");


app.use("/api/v1",userRoutes)
app.use("/api/v1/",recipeRoutes);

app.get("/",(req,res)=>{
  res.send("<center><h1>Recipe Management Api</h1><br>Get Recipe Api <a href=https://github.com/Devanshiballar/Recipe-Management.git target=_blank>Repository :Recipe-Management</a></center>")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  