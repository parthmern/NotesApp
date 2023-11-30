import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export function AppContextProvider ( {children} ){

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [allNotes, setAllNotes] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;

    function getTokenFromCookie(){
        // Function to get a specific cookie value by name
        function getCookie(name) {
            console.log(document.cookie);
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
            }
        }
        return null;
        }

        // Usage example
        const myCookieValue = getCookie('token'); // Retrieve a specific cookie value by name
        setToken(myCookieValue);
    }

    useEffect(()=>{
        getTokenFromCookie();
    })

    async function getNotes(){
        try{
            const config = {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              };
    
            const res = await axios(`${backendUrl}/notes`, config);
            console.log(res);

            setDeleted((prev)=>!prev);
            console.log(deleted);
            setAllNotes(res?.data?.allPosts?.notes)
            return res;
        }
        catch(error){
            console.log("error =>", error);
            setToken(null);
            setUser(null);
            // redirect to login page if(error.res.status)
            
        }
        
    }

    const value = {
        token ,
        setToken ,
        user ,
        setUser ,
        deleted ,
        setDeleted ,
        allNotes ,
        setAllNotes ,
        getNotes ,
        getTokenFromCookie ,
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}