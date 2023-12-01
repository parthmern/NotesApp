## 💛 Frontend Hosted on Netlify - [link](https://notesapp-parthmern.netlify.app/)
## 🩵 Backend deployed on vercel - 

## 💚 Features

🔐 Rigorous Signup Process: Implemented a robust signup mechanism using BCRYPTJS to securely hash user passwords and enforce username uniqueness.

🔑 Seamless Authentication & Authorization: Employed JWT-based authentication for smooth login procedures. Implemented stringent API authorization using a custom middleware to fortify data security.So, here i used one middleware named `authZmiddleware.js` to check user is logged in or not with JWT token.

🗒️ Powerful CRUD Operations: Empowered users with Create, Read, Update, and Delete functionalities for efficient note management within the MongoDB database.

📸 Dynamic Image Integration via Cloudinary: Elevated note-taking capabilities with dynamic image uploads. Leveraged Cloudinary's seamless integration to efficiently store images in the cloud, providing optimized storage and retrieval. Additionally, integrated image size compression for resource optimization.

## ❤️ Error that i faced

🛠️ Handling Environment Variables with Vite: Struggled with setting up and utilizing .env variables in a Vite-based React app. And i solved it from one youtube video and solution is also available on my github repo. 
```
// 📂 .env
VITE_BACKEND_URL = "xxxxxxxx" 

// How to access
const backendUrl = import.meta.env.VITE_BACKEND_URL ;
```
🚧 CORS Errors in Backend: Encountered Cross-Origin Resource Sharing (CORS) issues in the backend. This issue commonly arises when making requests from one domain to another, leading to security restrictions. I forgot to use this but identify it easily

🌐 Deployment Challenges on RenderSite : Faced various challenges when attempting to deploy the backend on Render, causing impediments in the deployment process. So, **i was unable to do deployment on Render named site and i choose vercel - [tutorial link](https://www.youtube.com/watch?v=eXAYkk99TaY)**. 

🚀 Successful Deployment on Vercel & Netlify: Overcame hurdles by successfully deploying the backend for the first time on Vercel and opting for Netlify to host the frontend, achieving a functional deployment setup.

## 💛 Unable to solve set cookie error

🍪 So it is backend error especially while setting cookies in browser and during successfull Login i am sending `res.cookie` to the client but client browser is not accepting cookies so it is one loophole during authZ if you can solve this then please requestfully ping me on my socialmedia platforms. *and during the testing on POSTMAN the cookies setting is working successfully*
```
// 📂 Backend > controllers > user.js

        const token = await jwt.sign(payload, secretKey, {
            expiresIn : "9m"
        })
        console.log("jwt token ==> ", token);

        const options = {
            expires: new Date(Date.now() + 60 * 9 * 1000),  // Set expiration time to 1 minute from now
            httpOnly: true,
            path:"/",
            //sameSite: 'None',
            secure: false,
        };

        res.cookie("token", token, options);
```
