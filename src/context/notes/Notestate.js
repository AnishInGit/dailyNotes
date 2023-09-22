import NoteContext from "./NoteContext";
import { useState } from "react";
const Notestate = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

//Get Note
const getNote = async () => {
        //API call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json() // parses JSON response into native JavaScript objects
        setNotes(json);

      };


  //Add Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        },body: JSON.stringify({title,description,tag})
       });
       const note = await response.json() // parses JSON response into native JavaScript objects
      
    //logic for add note
    setNotes(notes.concat(note));
 
  };


  //Delete Note
  const deleteNote = async(id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            },
            });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(json)

    const newNote = notes.filter((note) => {
      return note._id !== id;
    }); 
    setNotes(newNote);
  };
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag})
        });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)



      //to update the front end
      getNote(setNotes)  
      
    // let newNotes=JSON.parse(JSON.stringify(notes))
    // //Logic to edit
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id ===id) {
    //     newNotes[index] = title;
    //     newNotes[index] = description;
    //     newNotes[index] = tag;
    //     break;
    //   }
    // }
    // setNotes(newNotes)
  };
 
  return (
    <>
      <NoteContext.Provider value={{ addNote, deleteNote, editNote,getNote,notes}}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default Notestate;
