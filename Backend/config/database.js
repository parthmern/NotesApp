const mongoose = require("mongoose");

const dbConnect=()=>{
    mongoose.connect("mongodb+srv://pptl8685:V5vPTV2CairDz6eX@cluster0.ehycfhl.mongodb.net/NotesApp")
    .then(()=>{console.log("mongoose is connected");})
    .catch((error)=>{console.log(`error while connecting with db ${error}`);})
}

module.exports = dbConnect ;
