import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
const About=()=>{
  const a= useContext(NoteContext)
  return (
    <div>
      Wellcome to our dailynotes about section, {a.name} and your no is {a.no}.........
    </div>
  )
}

export default About
