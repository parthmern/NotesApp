import React, { useContext, useState } from "react";
import DragDrop from "../components/dragDrop/DragDrop";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const UpdateNotePage = () => {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const [oldfile, setOldfile] = useState(null);

  async function getNoteDetails(id) {
    try {
      const data = {
        id: id,
      };
      console.log("data==>", data, id);
      const res = await axios(`${backendUrl}/oneNote`, {
        params: {
          id: id,
        },
      });

      console.log(res);

      // set title and desc value
      setTitle(res?.data?.note?.title);
      setDesc(res?.data?.note?.desc);
      setOldfile(res?.data?.note?.img);
    } catch (error) {
      console.log("error =>", error);
    }
  }

  useState(() => {
    getNoteDetails(id);
  }, [id]);

  const handleChange = (file) => {
    setFile(file);
  };

  async function updateNoteHandler(note) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post(`${backendUrl}/updateNote`, note, config);

      console.log(res);

      navigate(`/note/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.data.error.message) {
        toast.error(error.response.data.error.message);
      }
      console.log("errror =>", error, error.response.data.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("update submit called");

    if (!title || !desc) {
      toast.error("title or desc empty");
      return;
    }

    const note = {
      title: title,
      desc: desc,
      imageFile: file,
      id: id,
    };

    toast.promise(updateNoteHandler(note), {
      loading: "Updating...",
      success: <b>Note updated</b>,
      error: <b>Could not save.</b>,
    });
  }

  console.log("file ==>", file);
  console.log("title and desc", title, desc);
  return (
    <div>
        
    <div className="nav-heading  text-white w-full mx-auto ml-4 mt-4 text-[25px]">
                UPDATE NOTE
    </div>

    <div>
        {
            title ? (
                <div className="p-7 mt-8 ">
                    <form className="flex flex-col w-full md:w-[50%] mx-auto items-center justify-center gap-y-10">
                    <div className="form-group w-full flex items-center justify-between gap-x-5">
                        <label className="text-lg text-white font-bold capitalize">
                        TITLE
                        </label>
                        <input
                        type="text"
                        name="title"
                        id="title"
                        className="form-control  bg-[#0E1725]  w-[300px] my-auto hover:opacity-80  rounded-xl overflow-hidden  p-3  font-semibold text-white dark:bg-blue/10 dark:text-white"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group w-full flex items-center justify-between gap-x-5">
                        <label className="text-lg text-white font-bold capitalize">
                        CAPTION
                        </label>
                        <textarea
                        type="textarea"
                        name="desc"
                        id="desc"
                        className="form-control bg-[#328af11a] h-[250px] w-[300px] hover:opacity-80 rounded-xl overflow-hidden   p-3  font-semibold text-white dark:bg-blue/10 dark:text-white"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="form-group  file-area gap-y-3 flex-col items-center justify-center">
                        {/* Implement DragDrop component and pass handleChange */}
                        <DragDrop handleChange={handleChange} />
                        <div>
                        {!file?.name ? (
                            <img className="w-[200px] md:w-[300px]" src={oldfile} alt="" />
                        ) : (
                            <p className="text-[10px] opacity-50">{file?.name}</p>
                        )}
                        </div>
                    </div>
                    <div className="form-group rounded-full hover:text-[#00FF26] px-3 py-2 bg-[#328af1]">
                        <button onClick={handleSubmit} type="submit">
                        Update note
                        </button>
                    </div>
                    </form>
                </div>
            ) : (
                <div className="flex m-10">
                    note not available
                </div>
            )
        }
    </div>
    </div>
  );
};

export default UpdateNotePage;
