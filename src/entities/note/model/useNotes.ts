import {
  useCallback,
  useEffect,
  useMemo, useReducer,
  useState,
} from "react";
import {notesReducer} from "./notesReducer"
import notesAPI from "../api/notesAPI";
import useNotification from "@/shared/utils/useNotification";
import {NotePriority, NotesFilter, NewNote} from "./types";

const valuePriority: Record<NotePriority, number> = {
  low: 0,
  normal: 1,
  high: 2,
}

const useNotes = () => {
  const [notes, dispatch] = useReducer(notesReducer, [])
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingNoteId, setDisappearingNoteId] = useState<string | null>(null)
  const [appearingNoteId, setAppearingNoteId] = useState<string | null>(null)
  const [filter, setFilter] = useState<NotesFilter>('all')
  const [sortOnPriority, setSortOnPriority] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const {
    hideNotification,
    showNotification,
    notificationType,
  } = useNotification(4000)

  const loadNotes = useCallback((showLoadScreen: boolean) => {
    if (showLoadScreen) {
      setIsLoading(true)
    }

    notesAPI.getAll().then((serverNotes) => {
      dispatch({
        type: 'SET_ALL',
        notes: serverNotes.map((note) => {
          if (!note.priority) {
            return ({...note, priority: 'normal'})
          } else {
            return note
          }
        })
      })
      setLoadError(false)
    })
      .catch(() => {
        setLoadError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const deleteAllNotes = useCallback(() => {
    const isConfirm = confirm('Вы уверены, что хотите удалить все заметки?')

    if (isConfirm) {
      notesAPI.getAll()
        .then((notes) => {
          return notesAPI.deleteAll(notes)
        })
        .then(() => dispatch({type: 'DELETE_ALL'}))
        .catch(() => {
          showNotification('delete-all-error')
          loadNotes(false)
        })
    }
  }, [showNotification, loadNotes])

  const deleteNote = useCallback((noteId: string) => {
    notesAPI.delete(noteId)
      .then(() => {
        setDisappearingNoteId(noteId)
        setTimeout(() => {
          dispatch({type: 'DELETE', id: noteId})
          setDisappearingNoteId(null)
        }, 400)
      })
      .catch(() => {
        showNotification('delete-error')
      })
  }, [showNotification])

  const toggleNoteComplete = useCallback((noteId: string, isDone: boolean) => {
    notesAPI.toggleComplete(noteId, isDone)
      .then(() => {
        if (filter !== 'all') {
          setDisappearingNoteId(noteId)
          setTimeout(() => {
            dispatch({type: 'TOGGLE_COMPLETE', id: noteId, isDone})
            setDisappearingNoteId(null)
          }, 400)
        } else dispatch({type: 'TOGGLE_COMPLETE', id: noteId, isDone})
      })
      .catch(() => {
        showNotification('toggle-error')
      })
  }, [filter, showNotification])

  const addNote = useCallback((title: string, content: string, priority: NotePriority, callbackAfterAdding: () => void) => {
    const newNote: NewNote = {
      title,
      content,
      priority,
      isDone: false,
    }

    notesAPI.add(newNote)
      .then((addedNote) => {
        dispatch({type: 'ADD', note: addedNote})
        callbackAfterAdding()
        setSearchQuery('')
        if (filter === 'completed') {
          showNotification('show-add')
        }
        setAppearingNoteId(addedNote.id)
      })
      .catch(() => {
        showNotification('add-error')
      })
  }, [filter, showNotification])

  useEffect(() => {
    loadNotes(false)
  }, []);

  useEffect(() => {
    if (appearingNoteId === null) {
      return
    }

    const appearTimer = setTimeout(() => {
      setAppearingNoteId(null)
    }, 400)

    return () => clearTimeout(appearTimer)
  }, [appearingNoteId]);

  const visibleNotes = useMemo(() => {
    if (filter === 'completed') {
      return notes.filter(({isDone}) => isDone)
    } else if (filter === 'active') {
      return notes.filter(({isDone}) => !isDone)
    } else {
      return notes
    }
  }, [notes, filter])

  const filteredNotes = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? visibleNotes.filter(({title, content}) =>
        title.toLowerCase().includes(clearSearchQuery) ||
        content.toLowerCase().includes(clearSearchQuery)
      )
      : null
  }, [
    visibleNotes,
    searchQuery,
  ])

  const isSearching = filteredNotes !== null
  const notesToRender = useMemo(() => {
    const notesList = isSearching ? filteredNotes : visibleNotes
    return sortOnPriority
      ? [...notesList].sort((a, b) =>
        valuePriority[b.priority] - valuePriority[a.priority]
      )
      : notesList
  }, [isSearching, visibleNotes, filteredNotes, sortOnPriority])

  return {
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
  }
}

export default useNotes