import {createContext, useMemo} from "react"
import useNotes from "./useNotes";
import useIncompleteNoteScroll from "./useIncompleteNoteScroll";

export const NotesActionsContext = createContext(undefined)
export const NotesDataContext = createContext(undefined)

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
    loadError,
    setLoadError,
    isLoading,
    setIsLoading,
    loadNotes,
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
    loadNotes,
    setLoadError,
    setIsLoading,
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
    loadNotes,
    setLoadError,
    setIsLoading,
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
    loadError,
    isLoading,
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
    loadError,
    isLoading,
  ])

  return (
    <NotesActionsContext.Provider value={actions}>
      <NotesDataContext.Provider value={data}>
        {children}
      </NotesDataContext.Provider>
    </NotesActionsContext.Provider>
  )
}
