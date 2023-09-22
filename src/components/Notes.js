import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
// import { editableInputTypes } from "@testing-library/user-event/dist/utils";

const Notes = () => {
  const context = useContext(NoteContext);
  let navigate=useNavigate();
  const { notes, getNote ,editNote} = context;
  useEffect(() => {  
    if(localStorage.getItem('token')){
      getNote()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);

  const [note, setNote] = useState({ id:"",etitle: "", etag: "", edescription: "" });
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleOnclick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click();
  };
  return (
    <>
      <Addnote />
      <button
        type="button"
        className="btn btn-primary my-3 d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
 
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="mb-3 w-100">
                    <label htmlFor="title" className="form-label ">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle"
                      placeholder="Enter A Title Here (MinLen: 5)"
                      value={note.etitle}
                      minLength={5} required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3 w-100">
                    <label htmlFor="tag" className="form-label ">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      placeholder="Enter A Tag Here (MinLen: 3)"
                      value={note.etag}
                      minLength={3} required
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3 w-100">
                    <label htmlFor="Description" className="form-label ">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eDescription"
                      name="edescription"
                      placeholder="Enter Description Here (MinLen: 5)"
                      value={note.edescription}
                      minLength={5} required
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refclose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  type="button" disabled={note.etitle.length<5 || note.edescription.length <5 || note.etag.length<3} className="btn btn-primary" onClick={handleOnclick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
        <h1>Your Notes</h1>
      <div className="container row my-3 mx-2">
        {notes.length===0 && "No Note Available"}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
