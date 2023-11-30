import "../form/index.css";
import React, { useContext, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import axios from 'axios';
import { AppContext } from "../../context/AppContext";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Form = ({name}) =>{

	const {token, setToken, user, setUser} = useContext(AppContext);

	const navigate = useNavigate();

	const backendUrl = import.meta.env.VITE_BACKEND_URL ;
	console.log(backendUrl);
	

	const [formData, setFormData] = useState(
		{
			name : "", 
			pass : "",
		}
	)

	const changeHandler = (event) =>{
		console.log("event.target.name =>", event.target.name);
		setFormData((prev)=>{
			return(
				{
					...prev,
					[event.target.name] : event.target.value,
				}
			)
		})
	}

	async function submitHandlerSignup(event){
		console.log("submitted signup");
		event.preventDefault();
		try{


			const res = await axios.post(`${backendUrl}/createUser`, formData);
			
			console.log("res==>", res);

			toast.success("new user created");
			navigate("/page/login");
			
		}
		catch(error){
			console.log("error =>", error);
			toast.error(error?.response?.data?.message);
		}
	}

	async function submitHandlerLogin(event){
		console.log("submitted login");
		event.preventDefault();
		try{

				let res = await axios.post(`${backendUrl}/login`, formData);
				console.log(res);

				const _token = await res.data.token ;

				if(_token){
					console.log(_token);
					setToken(_token);

					
					//cookies.set('token', _token);

					// Function to set a cookie
					function setCookie(name, value, days) {
						const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
  						const expires = new Date(Date.now() + tenMinutes).toUTCString();
						
						document.cookie = `${name}=${value}; expires=${expires}; path=/`;
					}
  
					// Usage example
					setCookie('token',_token); // Sets a cookie named 'myCookie' that expires in 7 days
  
						
					//toast.success("Loggin successfull");
					setUser(res.data.userAvailable);
					navigate("/");
				}

			// const res = await axios.post(`${backendUrl}/createUser`, formData);
			// console.log("res==>", res);

			
			
		}
		catch(error){
			console.log("error =>", error);
			toast.error(`${error?.response?.data?.message}`);
		}
	}


	console.log("formData =>", formData)
	console.log("token =>", token);

    return(
        <div className=" flex items-center justify-center ">
			
			<div className="section mt-0 ">
				<div className=" flex justify-center items-center">
					<div className="row full-height justify-content-center">
						<div className="col-12 text-center align-self-center py-5">
							<div className="section pb-5 pt-5 pt-sm-2 text-center">
								<h6 className="mb-0 nav-heading text-white w-full mx-auto ml-0 md:ml-4 mt-4 text-[25px] text-xl">{name} FORM</h6>
								<div className="card-3d-wrap mx-auto">
									<div className="card-3d-wrapper">
										<div className="card-front">
											<div className="center-wrap">
												<div className="section text-center">
													<h4 className="mb-4 pb-3">{name}</h4>
													<div className="form-group relative">
														<BiSolidUserCircle className="flex absolute text-3xl left-2 top-2" />
														<input type="text" onChange={changeHandler} name="name" className="form-style" placeholder="Username" id="logemail"  />
														
													</div>	
													<div className="form-group mt-2">
														<FaLock className="flex absolute text-3xl left-2 top-2" />
														<input type="password" onChange={changeHandler} name="pass" className="form-style" placeholder="Password" id="logpass"  />
														
													</div>
													<a href="#" className="btn mt-8" onClick={name==="LOGIN" ? submitHandlerLogin : submitHandlerSignup}>{name==="LOGIN" ? "LOGIN NOW" : "SIGNUP NOW"}</a>

												</div>
											</div>
										</div>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    )
}

export default Form ;