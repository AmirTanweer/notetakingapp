import React from 'react'
import { useContext  } from 'react'
import noteContext from '../context/notes/NoteContext'
export default function About() {
    const a=useContext(noteContext)
  
   
  return (
    <>
    <div >This is About and he is in class </div>
    
    </>

  )
}
