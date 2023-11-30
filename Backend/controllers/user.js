const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

const secretKey = 'yourSecretKey';

exports.signupController = async (req, res) =>{
    try{
        const {name, pass} = req.body ;
        console.log(name, pass);

        const existedUser = await User.findOne(
            {
                name
            }
        );

        if(existedUser){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "user already existed change username" ,
                    }
                )
            )
        }

        async function hashingPass(pass){
            try{
                //console.log(pass);
                const ans = await bcrypt.hash(pass, 10);
                console.log("hashedPass => ", ans);
                return(ans);
            }
            catch(error){
                console.log(error);
                return(false);
            }
        }

        const hashedPass = await hashingPass(pass);

        if(!hashedPass){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "bcryptJs not working" ,
                    }
                )
            )
        }

        const registeredUser = await User.create(
            {
                name , 
                pass : hashedPass ,
            }
        )

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "user signUp successfully" ,
                    registeredUser : registeredUser ,
                }
            )
        )

    }

    catch(error){
        return(
            res.status(401).json(
                {
                    success : false ,
                    message : `user signup FAILED ${error}` ,
                    error : error ,
                }
            )
        )
    }
}


exports.loginController = async (req, res) =>{
    try{
        const {name, pass} = req.body ;
        console.log(name, pass);

        const userAvailable = await User.findOne(
            {
                name ,
            }
        )

        console.log("user availabe ==>", userAvailable);

        if(!userAvailable){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "username not available" ,
                    }
                )
            )
        }

        const passMatch = await bcrypt.compare(pass, userAvailable.pass);
        console.log("passMatch ==>", passMatch);

        if(!passMatch){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "password do not match" ,
                    }
                )
            )
        }

        // if pass match then work on the COOKIES

        const payload = {
            id : userAvailable._id ,
            name : userAvailable.name ,
        }

        const token = await jwt.sign(payload, secretKey, {
            expiresIn : "9m"
        })
        console.log("jwt token ==> ", token);

        const options = {
            expires: new Date(Date.now() + 60 * 9 * 1000),  // Set expiration time to 1 minute from now
            httpOnly: true,
            path:"/",
            //sameSite: 'None',
            secure: false,
        };

        //res.cookie("age", 25);
        res.cookie("token", token, options);
        
        return(
            res.cookie("token", token, options).json({
                success : true , 
                token : token ,
                userAvailable : userAvailable ,
            })
            
        )
        
    }
    catch(error){
        return(
            res.status(400).json(
                {
                    success : false , 
                    message : `login error ${error}` ,
                }
            )
        )
    }
}