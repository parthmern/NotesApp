const express = require("express");
const app = express();

// first middlewares
app.use(express.json());

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// cookie parser - 
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// CORS
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    // credentials:true,            //access-control-allow-credentials:true
    // optionSuccessStatus:200
}
app.use(cors(corsOptions));


const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// cloudinary connection
const cloudinary = require("cloudinary").v2 ;
const {cloudinaryConnect} = require("./config/cloudinary");
cloudinaryConnect();

// db connect
const config = require("../Backend/config/database");
const dbConnect = require("../Backend/config/database");
const router = require("./routes/router");
dbConnect();


const routes = require("./routes/router");
app.use("/", routes);

app.get("/", (req, res)=>{
    res.send("this is Homepage trial on 3000 port");
});

require('dotenv').config();
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server listen at ${PORT}`);
});

// ============================================
// cookies check --- bc set he nhi ho rhi dev mode me
app.get("/check", function checkCookie(req, res){
    console.log("cookies", req.cookies);
    res.json({
        cookie : req.cookies ,
    })
})

app.get("/set", (req, res)=>{
    console.log("seted cookies");
    res.cookie("age", 25);
    res.send("cookies set")
})