const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String ,
            required: true,
        },

        pass : {
            type : String ,
            required: true,
        },

        notes : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : "Note",
        }]
    }
)

module.exports = mongoose.model("User", userSchema);