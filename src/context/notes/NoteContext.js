import { createContext } from "react";

//When React renders a component that subscribes to this Context 
//object it will read the current context value from the closest matching Provider above
// it in the tree.
const NoteContext=createContext();


export default NoteContext;