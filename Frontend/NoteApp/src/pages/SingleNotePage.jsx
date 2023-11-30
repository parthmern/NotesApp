import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleNote from "../components/singleNote/SingleNote";

const SingleNotePage = () =>{

    const {id} = useParams();

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    
    const [note, setNote] = useState(null);

    async function getOnePostDetails(id){
        try{
            const data = {
                id : id ,
            }
            console.log("data==>", data, id);
            const res = await axios(`${backendUrl}/oneNote`, {
                params: {
                    id: id
                }
            });
            console.log(res);
            setNote(res?.data?.note)
        }
        catch(error){
            console.log("error =>", error);
        }
    }
   
    useEffect(()=>{
        getOnePostDetails(id);
    },[id]);


    console.log("id SingleNotePage ==>", id);
    return(
        <div className="flex items-center justify-center m-6 ">
            {
                note ? (
                    <SingleNote note={note} id={id}  />
                ) : (
                    <div>
                        not available
                    </div>
                )
            }
        </div>
    )
}

export default SingleNotePage ;