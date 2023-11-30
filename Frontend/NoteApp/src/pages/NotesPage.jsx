import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import Note from "../components/note/Note";
import CreateNote from "../components/createNote/CreateNote";
import { useNavigate } from "react-router-dom";

const NotesPage = () =>{

    const {token, setToken, user, setUser, getNotes, deleted, allNotes, setAllNotes, getTokenFromCookie} = useContext(AppContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    const navigate = useNavigate();

    
    const [loading, setLoading] = useState(false);
    const [createNoteSection, setCreateNoteSection] = useState(false);

    function checkToken(){
        if(!token){
            toast.error("Token is not available");

            setToken(null);
            setUser(null);
            setAllNotes(null);

            function removeCookie(name) {
            document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
            removeCookie("token"); // Removes a cookie named 'myCookie' instantly       

            // redirect to login page
            navigate("/page/login");

        }
    }

    async function getNotesFunc(){
        console.log("getNotes called");
        
        const response = await getNotes();
        console.log("response=>", response);
        
    }

    useEffect(()=>{
        getTokenFromCookie();
        checkToken();
        getNotesFunc();
    },[token]);

    console.log("token in notes page =>", token);
    console.log("allNotes", allNotes);

    const total = allNotes ? allNotes.length : 0 ;

    return(
        <div className="relative">
            

            <div className="mt-6 flex px-5 items-center justify-between">
                <div className="nav-heading text-[30px]">Your Notes ({total})</div>
                <div className="rounded-full cursor-pointer text-center transition hover:text-[#00FF26] hover:bg-blue-800 px-3 py-2 bg-[#328af1]" onClick={()=>{navigate("/createNote")}}>Create Note</div>
            </div>


            <div className="flex h-auto w-auto overflow-visible flex-wrap gap-5 items-center justify-center p-[20px] ">
                {
                    allNotes ? (
                        <>
                        {
                            allNotes.map((note,index)=>{

                                const color = [
                                    "#d64f6f",
                                    "#d279be",
                                    "#be6a0a",
                                    "#36b4a6",
                                ];
                            
                                const selectedIndex = index % color.length ;
                                console.log(color[selectedIndex]);
                                

                                return(
                                    <div className={`bg-[${color[selectedIndex]}]`} >
                                        <Note color={color[selectedIndex]} item={note} index={index} id={note?._id} key={note._id} />
                                    </div>
                                    
                                )
                            })

                        }
                        </>
                    ) : (
                        <div>
                            Notes are not available
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default NotesPage ;