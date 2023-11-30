import React from "react";
import { useNavigate } from "react-router-dom";

const SingleNote = ({note,id}) =>{

    const navigate = useNavigate();

    return(
        <div className=" bg-[#328af112] hover:opacity-90 p-5 mb-8 rounded-lg w-full">
            <div className=" bg-[#0E1725] hover:opacity-80 mb-4 rounded-xl overflow-hidden  px-6 py-4 text-2lg font-semibold text-white dark:bg-blue/10 dark:text-white">
                {note?.title}
            </div>
            <div className="bg-[#328af11a] mb-4 hover:opacity-80 rounded-xl overflow-hidden   px-6 py-4 text-2lg font-semibold text-white dark:bg-blue/10 dark:text-white">
                {note?.desc}
            </div>
            <>
            {
                note?.img && (
                    <div className="rounded-md p-5 overflow-hidden">
                        <img src={note?.img} className="h-full w-full rounded-lg border border-white" alt="" />
                    </div>
                )
            }
            </>

            <div className="w-full flex items-end justify-end">
                <div
                onClick={()=>{
                    navigate(`/updatenote/${id}`)
                }}
                className="flex items-center justify-center cursor-pointer right-0 w-[200px] hover:text-black rounded-full px-3 py-2 bg-[#328af1] ">
                    Update Note
                </div>
            </div>
            
        </div>
    )
}

export default SingleNote;