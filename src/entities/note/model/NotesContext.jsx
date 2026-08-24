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
    notesToRender,
    deleteNote,
    deleteAllNotes,
    toggleNoteComplete,
    searchQuery,
    setSearchQuery,
    addNote,
    disappearingNoteId,
    appearingNoteId,
    filter,
    setFilter,
    hideNotification,
    showNotificationBadge,
    showNotification,
    sortOnPriority,
    setSortOnPriority,
  } = useNotes()

  const {
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  } = useIncompleteNoteScroll(notesToRender)

  const value = useMemo(() => ({
    notes,
    visibleNotes,
    notesToRender,
    deleteNote,
    deleteAllNotes,
    toggleNoteComplete,
    searchQuery,
    setSearchQuery,
    addNote,
    disappearingNoteId,
    appearingNoteId,
    filter,
    setFilter,
    hideNotification,
    showNotificationBadge,
    showNotification,
    sortOnPriority,
    setSortOnPriority,
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  }), [
    notes,
    visibleNotes,
    notesToRender,
    deleteNote,
    deleteAllNotes,
    toggleNoteComplete,
    searchQuery,
    setSearchQuery,
    addNote,
    disappearingNoteId,
    appearingNoteId,
    filter,
    setFilter,
    hideNotification,
    showNotificationBadge,
    showNotification,
    sortOnPriority,
    setSortOnPriority,
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  ])

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}
