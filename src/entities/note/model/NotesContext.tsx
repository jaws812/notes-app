import {createContext, useMemo} from "react"
import type {ReactElement, Dispatch, SetStateAction, RefObject} from "react"
import useNotes from "./useNotes";
import useIncompleteNoteScroll from "./useIncompleteNoteScroll";
import type {Note, NotesFilter, NotePriority} from './types'
import type {NotificationType} from '@/shared/utils/types'

interface NotesContextProps {
  children: ReactElement;
}

interface ActionsType {
  deleteNote: (noteId: string) => void;
  deleteAllNotes: () => void;
  toggleNoteComplete: (noteId: string, isDone: boolean) => void;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  addNote: (title: string, content: string, priority: NotePriority, callbackAfterAdding: () => void) => void;
  setFilter: Dispatch<SetStateAction<NotesFilter>>;
  hideNotification: () => void;
  showNotification: (type: NotificationType) => void;
  setSortOnPriority: Dispatch<SetStateAction<boolean>>;
  firstIncompleteNoteRef: RefObject<HTMLLIElement | null>;
  loadNotes: (showLoadScreen: boolean) => void;
}

interface DataType {
  notes: Note[];
  visibleNotes: Note[];
  notesToRender: Note[];
  searchQuery: string;
  disappearingNoteId: string | null;
  appearingNoteId: string | null;
  filter: NotesFilter;
  notificationType: NotificationType | null;
  sortOnPriority: boolean;
  firstIncompleteNoteId: string | undefined;
  loadError: boolean;
  isLoading: boolean;
}

export const NotesActionsContext = createContext<ActionsType | undefined>(undefined)
export const NotesDataContext = createContext<DataType | undefined>(undefined)

export const NotesProvider = (props: NotesContextProps) => {
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
    isLoading,
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
