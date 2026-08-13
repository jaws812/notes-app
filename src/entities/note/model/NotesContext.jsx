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
    isShowAllNotes,
    isShowCompletedNotes,
    isShowUnCompletedNotes,
    setIsShowAllNotes,
    setIsShowCompletedNotes,
    setIsShowUnCompletedNotes,
  } = useNotes()

  const {
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  } = useIncompleteNoteScroll(notes)

  const value = useMemo(() => ({
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
    disappearingNoteId,
    appearingNoteId,
    isShowAllNotes,
    isShowCompletedNotes,
    isShowUnCompletedNotes,
    setIsShowAllNotes,
    setIsShowCompletedNotes,
    setIsShowUnCompletedNotes,
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  }), [
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
    disappearingNoteId,
    appearingNoteId,
    isShowAllNotes,
    isShowCompletedNotes,
    isShowUnCompletedNotes,
    setIsShowAllNotes,
    setIsShowCompletedNotes,
    setIsShowUnCompletedNotes,
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  ])

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}
