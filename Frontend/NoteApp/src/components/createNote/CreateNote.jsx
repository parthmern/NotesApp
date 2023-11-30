import React, { useContext, useState } from "react";
import "./CreateNote.scss";
import DragDrop from "../dragDrop/DragDrop";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () =>{

    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    const {token} = useContext(AppContext);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    async function createNoteHandler(note){
        if(!token){
            toast.error("token is missing");
            return;
        }
        try{
            const config = {
                headers: {
                  'Authorization': `Bearer ${token}` ,
                  'Content-Type': 'multipart/form-data', 
                }
            };
            const res = await axios.post(`${backendUrl}/createNote`, note, config);

            console.log(res);
            

            // if(res.response.status == 500 ){
            //   throw error ;
            // }

            navigate("/notes");

        }
        catch(error){
            toast.error(error.response.data.message);
            if(error.response.data.error.message){
              toast.error(error.response.data.error.message);
            }
            console.log("errror =>", error, error.response.data.message);
            
        }
    }

  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("handlesubmit called");
      if(!title || !desc){
        toast.error("title or desc empty")
        return;
      }
      const note = {
        title : title ,
        desc : desc ,
        imageFile : file ,
      }

      
      toast.promise(
        createNoteHandler(note),
         {
           loading: 'Creating...',
           success: <b>Note created</b>,
           error: <b>Could not save.</b>,
         }
       );

    };
  

    console.log("file ==>", file);
    console.log("title and desc", title, desc);


    return(
    <div className="md:p-7 p-2 mt-8 ">
      <form className="flex flex-col w-full md:w-[50%] mx-auto items-center justify-center gap-y-10">
        <div className="form-group w-full flex items-center justify-between gap-x-0 md:gap-x-5">
          <label className="text-lg text-white font-bold capitalize">TITLE</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control m-2 bg-[#0E1725] w-[200px] md:w-[300px]  hover:opacity-80  rounded-xl overflow-hidden  p-3  font-semibold text-white dark:bg-blue/10 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group w-full flex items-center justify-between gap-x-0 md:gap-x-5">
          <label className="text-lg text-white font-bold capitalize">CAPTION</label>
          <textarea
            type="textarea"
            name="desc"
            id="desc"
            className="form-control m-2 bg-[#328af11a] h-[250px]  w-[200px] md:w-[300px]  hover:opacity-80 rounded-xl overflow-hidden   p-3  font-semibold text-white dark:bg-blue/10 dark:text-white"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="form-group min-w-auto file-area gap-y-3 flex-col items-center justify-center">
          {/* Implement DragDrop component and pass handleChange */}
          <DragDrop className="overflow-hidden " handleChange={handleChange} />
          <p className="text-[10px] opacity-50">{file?.name}</p>
        </div>
        <div className="form-group rounded-full hover:text-[#00FF26] px-3 py-2 bg-[#328af1]">
          <button onClick={handleSubmit} type="submit">Create note</button>
        </div>
      </form>
    </div>
    )
}

export default CreateNote ;