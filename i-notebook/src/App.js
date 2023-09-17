import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState';
export default function App() {
  return (
    <>
      <NoteState>

      <Router>
      <NavBar/>
      <div className="container">

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </Router>
      </NoteState>
    </>
  )
}
