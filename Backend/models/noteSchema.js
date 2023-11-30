const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title : {
            type : String ,
            required : true ,
        } , 

        desc : {
            type : String ,
            required : true ,
        } ,

        img : {
            type : String ,
        }
    }
)

module.exports = mongoose.model("Note", noteSchema);