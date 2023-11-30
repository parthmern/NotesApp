import React, { useEffect } from "react";
import "./Note.css" ;
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../delete/DeleteBtn";

const Note = ({item,index,color,id}) =>{

    const navigate = useNavigate();



    let desc = item?.desc ;
    item?.img ? (desc = desc.slice(0,50) + " ...") : (desc = desc.slice(0,200) + " ...")
    
    //console.log(id);
    return(
        <div id={id}  className={`relative m-1 box bg-[#328af11a]  md:saturate-50 transition hover:saturate-100 flex gap-y-2 overflow-hidden p-5 ring-blue-500 cursor-pointer flex-col rounded-lg h-[300px] w-[300px] `}>
            <div onClick={()=>{navigate(`/note/${id}`)}} className="text-white font-bold truncate text-ellipsis bg-[#0E1725] p-2 min-h-[40px] rounded-lg">{item?.title}</div>
            <div onClick={()=>{navigate(`/note/${id}`)}} className="text-white px-3 h-[50px] max-w-[300px]">{desc}</div>
            <div onClick={()=>{navigate(`/note/${id}`)}} className="flex items-center justify-center w-full h-[155px] ">
                <img className="h-full " src={item?.img} alt="" />
            </div>

            <DeleteBtn id={id} />
            
        </div>
    )
}

export default Note ;