import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { BiSolidUser } from "react-icons/bi";
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const { token, setToken, user, setUser, setAllNotes } =
    useContext(AppContext);

  const navigate = useNavigate();

  const username = user?.name;

  function logoutHandler() {
    setToken(null);
    setUser(null);
    setAllNotes(null);

    function removeCookie(name) {
      document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    removeCookie("token"); // Removes a cookie named 'myCookie' instantly       
    
    toast.success("Logout successfully");
  }

  return (
    <div className="w-full bg-black flex uppercase top-0 items-center justify-between px-3 py-4
    
    ">
      <div className="nav-heading nav-logo text-xl  md:text-3xl">Notes</div>

      <div className="flex   gap-x-4">
        <div
          className="cursor-pointer  hidden md:block text-[#00FF26] nav-heading "
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </div>
        <div
          className="cursor-pointer text-[15px] text-[#00FF26] nav-heading"
          onClick={() => {
            navigate("/notes");
          }}
        >
          Notes
        </div>
      </div>

      <div className="cursor-pointer  ">
        {token ? (
          <div className="flex gap-x-4 items-center justify-center ">
            <div className="hidden md:flex gap-x-1 items-center justify-center ">
              <BiSolidUser className="text-[25px] text-[#ec454f]" />
              <p className="text-[#ec454f]">{username}</p>
            </div>
            <p
              onClick={logoutHandler}
              className="hover:text-red-500 rounded-full  text-[10px] md:text-[15px] px-2 py-1 md:px-3 md:py-2 bg-[#328af1] "
            >
              Logout
            </p>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <p
              className="rounded-full hover:text-[#00FF26] text-[10px] md:text-[15px] px-2 py-1 md:px-3 md:py-2 bg-[#328af1]"
              onClick={() => {
                navigate("/page/login");
              }}
            >
              Login
            </p>
            <p
              className="rounded-full hover:text-[#00FF26] text-[10px] md:text-[15px] px-2 py-1 md:px-3 md:py-2 bg-[#328af1]"
              onClick={() => {
                navigate("/page/signup");
              }}
            >
              signup
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
