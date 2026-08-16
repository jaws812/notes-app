import {createContext, useMemo} from "react"
import useNotes from "./useNotes";
import useIncompleteNoteScroll from "./useIncompleteNoteScroll";

export const NotesContext = createContext({})

export const NotesProvider = (props) => {
  const {
    children,
  } = props

  const {
    notes,
    visibleNotes,
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
    disappearingNoteId,
    appearingNoteId,
    filter,
    setFilter,
  } = useNotes()

  const {
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  } = useIncompleteNoteScroll(visibleNotes)

  const value = useMemo(() => ({
    notes,
    visibleNotes,
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
    disappearingNoteId,
    appearingNoteId,
    filter,
    setFilter,
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  }), [
    notes,
    visibleNotes,
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
    disappearingNoteId,
    appearingNoteId,
    filter,
    setFilter,
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  ])

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}
