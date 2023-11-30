import React, { useContext } from "react";
import "./DeleteBtn.scss";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DeleteBtn = ({id}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;

    const {getNotes} = useContext(AppContext);

    async function deleteHandler(id) {
        console.log("delete clicked ");
    
        try {
            const res = await axios.delete(`${backendUrl}/deleteNote`, {
                data: {
                    noteId: id,
                }
            });
            console.log(res);
            getNotes();
            toast('Note deleted', {
                icon: '⛔',
              });
        } catch (error) {
            console.log("error =>", error);
        }
    }
    

    return(
        <div
        id={id}
        onClick={()=>{deleteHandler(id)}}
        className="absolute right-3 bottom-3 h-[35px] border-2 rounded-full hover:bg-red-700/40  transition border-[#0E1725] w-[35px] flex items-center justify-center ">
            <MdDelete className="text-red-700 " />
        </div>
    )
}

export default DeleteBtn ;