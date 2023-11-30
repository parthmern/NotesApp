import React from "react";
import CreateNote from "../components/createNote/CreateNote";

const CreateNotePage = () =>{
    return(
        <div>
            <div className="nav-heading text-white w-full mx-auto ml-4 mt-4 text-[20px] md:text-[25px]">
                CREATE A NEW NOTE
            </div>
            <CreateNote />
        </div>
    )
}

export default CreateNotePage ;