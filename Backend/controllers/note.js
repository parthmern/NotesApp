const Note = require("../models/noteSchema");
const User = require("../models/userSchema");

const cloudinary = require("cloudinary").v2 ;

exports.createNoteController = async (req, res) => {
    try {
        const { title, desc } = req.body;
        console.log(title, desc);

        console.log(req.files);

        let createdNote;

        if(req.files){

            // getting imageFile
            const file = req.files.imageFile ;
            console.log(file);

            // validation on img types
        
            const fileType = file.name.split(".")[1].toLowerCase()  ;
            console.log("filetype==>", fileType);
    
            async function checkValidation (){
                const supportedTypes = ["jpg", "jpeg", "png"];
                if(await supportedTypes.includes(fileType)){
                    return true ;
                }
                else{
                    return false;
                }
            }
    
            const validationAns = await checkValidation();
            console.log("validationAns=>",validationAns);
            if(!validationAns){
                return(
                    res.status(400).json({
                        success : false ,
                        message : "Not supported file types"
                    })
                )
            }
    
            // uploading on cloudinary
            async function uploadFileToCloudinary(file, folder, quality){
                const options = {folder};
            
                if(quality){
                    options.quality = quality ;
                }
            
                options.resource_type = "auto" ;
                return await cloudinary.uploader.upload(file.tempFilePath, options);
            } 
    
            const uploaded = await uploadFileToCloudinary(file, "notesApp");
            console.log("uploaded==>", uploaded);

            createdNote = await Note.create({
                title,
                desc,
                img : uploaded.secure_url,
            });

            
        }
        else{
            createdNote = await Note.create({
                title,
                desc,
            });
            console.log("createdNote", createdNote);

            
        }

        // Updation with user collection
        const userId = req.user.id ;
        console.log("user id: ", req.user);

        const updationForUser = await User.findByIdAndUpdate(
            userId,
            { $push: { notes: createdNote._id } },
            { new: true }
        ).populate("notes");

        console.log(`${createdNote._id} is added in USER model and updationForUser is `, updationForUser);

        res.status(200).json({
            success: true,
            createdNote: createdNote,
            updationForUser: updationForUser,
        });
    } 
    
    catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, error: "note is not created", error:error });
    }
};

exports.getAllNotesController = async (req, res) => {
    try{

        const id = req.user.id ;
        console.log("id=>", id);

        if(!id){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "ID is missing" ,
                        id : id ,
                    }
                )
            )
        }

        const allPosts = await User.findById(id).populate("notes");

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "got details" ,
                    allPosts : allPosts ,
                }
            )
        )

    }

    catch(error){
        return(
            res.status(400).json(
                {
                    success : false ,
                    message : "error in getting all posts" ,
                    error : error ,
                }
            )
        )
    }
}

exports.getOneNoteController = async (req, res) =>{
    try{
        const { id } = req.query;
        console.log("id ==>", req.body, id,req.query);

        if(!id){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "id not availabe/undefined" ,
                        id : id ,
                    }
                )
            )
        }

        const note = await Note.findById(id);

        if(!note){
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "noteID is wrong" ,
                        id : id ,
                    }
                )
            )
        }

        console.log("note=>", note);
        
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : `got note from id= ${id} `,
                    note : note ,
                }
            )
        )

    }
    catch(error){
        return(
            res.status(400).json(
                {
                    success : false ,
                    message : "error in getting note",
                    error : error ,
                }
            )
        )
    }
}

exports.deleteNoteController = async(req, res) =>{
    try{
        console.log("Request body:", req.body);
        const {noteId} = req.body ;
        console.log("noteId =>", noteId);

        const deletedNote = await Note.findByIdAndDelete(noteId);
        
        console.log("deletedNote =>", deletedNote);

        // no need to POP from user Notes relation

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Note deleted successfully" ,
                    deletedNote : deletedNote ,
                }
            )
        )

    }
    catch(error){
        return(
            res.status(400).json(
                {
                    success : false ,
                    message : "error in note deletetion" ,
                    error : error ,
                }
            )
        )
    }
}

exports.updateNoteController = async (req, res) =>{
    try{
        const { title, desc, id } = req.body;
        console.log(title, desc, id);

        console.log(req.files);

        const availabeId = await Note.findById(id);

        if(!availabeId){
            return(
                res.status(400).json({
                    success : false ,
                    message : "noteId not available" ,
                })
            )
        }

        let updatedNote;

        if(req.files){

            // getting imageFile
            const file = req.files.imageFile ;
            console.log("file==>", file);

            // validation on img types
        
            const fileType = file.name.split(".")[1].toLowerCase() ;
            console.log("filetype==>", fileType);
    
            async function checkValidation (){
                const supportedTypes = ["jpg", "jpeg", "png"];
                if(await supportedTypes.includes(fileType)){
                    return true ;
                }
                else{
                    return false;
                }
            }

            const validationAns = await checkValidation();
            console.log("validationAns=>",validationAns);
            if(!validationAns){
                return(
                    res.status(400).json({
                        success : false ,
                        message : "not supported file types"
                    })
                )
            }
    
            // uploading on cloudinary
            async function uploadFileToCloudinary(file, folder, quality){
                const options = {folder};
            
                if(quality){
                    options.quality = quality ;
                }
            
                options.resource_type = "auto" ;
                return await cloudinary.uploader.upload(file.tempFilePath, options);
            } 
    
            const uploaded = await uploadFileToCloudinary(file, "notesApp");
            console.log("uploaded==>", uploaded);

            updatedNote = await Note.findByIdAndUpdate(
                id,
                {
                    title : title,
                    desc : desc ,
                    img : uploaded.secure_url,
                },
                { new: true } 
            );

            return(
                res.status(200).json({
                    success: true,
                    updatedNote: updatedNote,
                })
            )

        }

        else{
            updatedNote = await Note.findByIdAndUpdate(
                id,
                {
                    title : title,
                    desc : desc ,
                },
                { new: true } 
            );
            console.log("updatedNote", updatedNote);

            return(
                res.status(200).json({
                    success: true,
                    updatedNote: updatedNote,
                })
            )
            
        }




    }
    catch (error) {
        console.log("Error:", error);
        res.status(400).json({ success: false, error: "note is not updated" });
    }
}