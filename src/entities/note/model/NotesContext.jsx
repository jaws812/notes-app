import {
  createContext,
} from "react"
import useNotes from "./useNotes";
import useIncompleteNoteScroll from "./useIncompleteNoteScroll";

export const NotesContext = createContext({})

export const NotesProvider = (props) => {
  const {
    children,
  } = props

  const {
    notes,
    filteredNotes,
    deleteNote,
    deleteAllNotes,
    toggleNoteComplete,
    newNoteTitle,
    setNewNoteTitle,
    newNoteContent,
    setNewNoteContent,
    newNoteInputRef,
    searchQuery,
    setSearchQuery,
    addNote,
  } = useNotes()

  const {
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  } = useIncompleteNoteScroll(notes)

  return (
    <NotesContext.Provider
      value={{
        notes,
        filteredNotes,
        firstIncompleteNoteRef,
        firstIncompleteNoteId,
        deleteNote,
        deleteAllNotes,
        toggleNoteComplete,
        newNoteTitle,
        setNewNoteTitle,
        newNoteContent,
        setNewNoteContent,
        newNoteInputRef,
        searchQuery,
        setSearchQuery,
        addNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}
