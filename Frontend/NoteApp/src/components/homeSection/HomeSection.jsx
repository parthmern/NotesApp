import React from "react";
import human1 from "../../assets/images/human-1.svg";
import human2 from "../../assets/images/human-2.svg";
import star from "../../assets/images/stars.svg";
import "./homesection.css";

const HomeSection = () =>{
    return(
        <div className="flex h-full ">
            <img src={human1} className="imageShadow w-[150px] md:w-[350px] absolute left-0 bottom-0 shadow-md"></img>
            <img src={human2} className="imageShadow w-[150px] md:w-[300px] absolute right-0 bottom-0"></img>

            <div className="absolute flex text-[#FFD700] h-[90vh] w-full items-center justify-center">
                <p className="relative md:p-0 px-3 nav-heading flex top-[-50px] md:top-0  items-center text-center max-w-[500px] shadow-black drop-shadow-sm text-3xl md:text-5xl overflow-hidden ">Write your thoughts down as they come to you.
                <img className="absolute z-[100] top-[0px] left-[0px] w-[40px] md:w-[80px] " src={star} />
                <img className="absolute bottom-[0px] right-[0px] w-[40px] md:w-[80px] " src={star} />
                </p>
            </div>
        </div>
    )
}

export default HomeSection ;