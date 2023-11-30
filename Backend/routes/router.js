const express = require("express");
const router  = express.Router();

const {signupController, loginController} = require("../controllers/user");
const {createNoteController, getAllNotesController, getOneNoteController, deleteNoteController, updateNoteController} = require("../controllers/note");

const {authZmiddleware} = require("../middlewares/authZmiddleware");

router.post("/createUser", signupController)
.post("/createNote",authZmiddleware, createNoteController)
.post("/login", loginController)
.get("/notes",authZmiddleware, getAllNotesController)
.get("/oneNote", getOneNoteController)
.delete("/deleteNote", deleteNoteController)
.post("/updateNote", updateNoteController);

module.exports = router ;