import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';


const Addnote = () => {
    const context = useContext(NoteContext);
  const {addNote}=context;
  const [note, setNote] = useState({title:"",tag:"",description:""})
  const onChange=(e)=>{ 
    setNote({...note,[e.target.name]:e.target.value})
  }
const handleOnclick=(e)=>{
    e.preventDefault();
   addNote(note.title,note.description,note.tag);
   setNote({title:"",tag:"",description:""})
    }
  return (
    <div>
      <h1>Add Note</h1>
        <form>
  <div className="mb-3 w-50">
    <label htmlFor="title" className="form-label " >Title</label>
    <input type="text" className="form-control" id="title" name='title' value={note.title} minLength={5} required  placeholder='Enter A Title Here (MinLen: 5)' onChange={onChange} />
  </div>
  <div className="mb-3 w-50">
    <label htmlFor="tag" className="form-label " >Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} minLength={3} required placeholder='Enter A Tag Here (MinLen: 3)'  onChange={onChange}/>
  </div>
  <div className="mb-3 w-50">
    <label htmlFor="Description" className="form-label " >Description</label>
    <input type="text" className="form-control" id="Description" name='description' value={note.description} minLength={5} required placeholder='Enter Description Here (MinLen: 5)' onChange={onChange}/>
  </div>
  <button type="submit" disabled={note.title.length<5 || note.description.length <5 || note.tag.length<3} className="btn btn-primary" onClick={handleOnclick}>Add Note</button>
</form>
    </div>
  )
}

export default Addnote
