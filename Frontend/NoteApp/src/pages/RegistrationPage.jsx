import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const RegistrationPage = () =>{

    const {pagename} = useParams();
    console.log("pagename=>", pagename);

    const [livePageName, setLivePageName] = useState(pagename);

    useEffect(()=>{
        setLivePageName(pagename);
    }, [pagename]);

    console.log("livePageName =>", livePageName);

    return(
        <div className="overflow-x-hidden ">
            {
                (livePageName === "login" ) ? (<LoginPage />) : (<SignupPage/>) 
            }
        </div>
    )

}

export default RegistrationPage ;
