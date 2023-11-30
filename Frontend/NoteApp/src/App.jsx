import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import NotAvailable from './pages/NotAvailable';
import HomePage from './pages/HomePage';
import toast, { Toaster } from 'react-hot-toast';
import NotesPage from './pages/NotesPage';
import Navbar from './components/navbar/navbar';
import CreateNotePage from './pages/CreateNotePage';
import SingleNotePage from './pages/SingleNotePage';
import UpdateNotePage from './pages/UpdateNotePage';


function App() {
  
  return(
    <div className='bg-[#151f32] '>
      <div className="overflow-x-visible"><Toaster  toastOptions={{style: {overflow: 'auto', overflowX : 'auto' ,maxWidth: '600px',}}} className=" overflow-x-visible" /></div>
      <Navbar className="w-full" />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/page/:pagename' element={<RegistrationPage />}></Route>
        <Route path='/notes' element={<NotesPage />} />
        <Route path='/createNote' element={<CreateNotePage />} />
        <Route path='/note/:id' element={<SingleNotePage />} />
        <Route path='/updateNote/:id' element={<UpdateNotePage />} />
        <Route path='*' element={<NotAvailable/>} ></Route>
      </Routes>
    </div>
  );
}

export default App
