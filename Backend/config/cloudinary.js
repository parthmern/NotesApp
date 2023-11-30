const cloudinary = require("cloudinary").v2 ;

exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name: "dncm3mid4" ,
            api_key: "695671425391212",
            api_secret: "OJnFyjXsomwhu5FZoOEL39Bv3pI" ,
          });
        
        console.log("clodinary connection successful");
    }
    catch(error){
        console.log("error in cloudinary connection",error);
    }
}