import {createContext, useMemo} from "react"
import useNotes from "./useNotes";
import useIncompleteNoteScroll from "./useIncompleteNoteScroll";

export const NotesActionsContext = createContext({})
export const NotesDataContext = createContext({})

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
    showNotification,
    notificationType,
    sortOnPriority,
    setSortOnPriority,
  } = useNotes()

  const {
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
  } = useIncompleteNoteScroll(notesToRender)

  const actions = useMemo(() => ({
    deleteNote,
    deleteAllNotes,
    toggleNoteComplete,
    setSearchQuery,
    addNote,
    setFilter,
    hideNotification,
    showNotification,
    setSortOnPriority,
    firstIncompleteNoteRef,
  }), [
    deleteNote,
    deleteAllNotes,
    toggleNoteComplete,
    setSearchQuery,
    addNote,
    setFilter,
    hideNotification,
    showNotification,
    setSortOnPriority,
    firstIncompleteNoteRef,
  ])

  const data = useMemo(() => ({
    notes,
    visibleNotes,
    notesToRender,
    searchQuery,
    disappearingNoteId,
    appearingNoteId,
    filter,
    notificationType,
    sortOnPriority,
    firstIncompleteNoteId,
  }), [
    notes,
    visibleNotes,
    notesToRender,
    searchQuery,
    disappearingNoteId,
    appearingNoteId,
    filter,
    notificationType,
    sortOnPriority,
    firstIncompleteNoteId,
  ])

  return (
    <NotesActionsContext.Provider value={actions}>
      <NotesDataContext.Provider value={data}>
        {children}
      </NotesDataContext.Provider>
    </NotesActionsContext.Provider>
  )
}
