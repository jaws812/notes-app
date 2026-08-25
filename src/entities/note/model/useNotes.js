import {
  useCallback,
  useEffect,
  useMemo, useReducer,
  useState,
} from "react";
import notesAPI from "@/shared/api/notes";
import useNotification from "@/shared/utils/useNotification";

const valuePriority = {
  low: 0,
  normal: 1,
  high: 2,
}

// в state будет храниться наше состояние - массив заметок
/* в action будет приходить объект у которого гарантированно будет свойство
type и опционально дополнительные данные*/
/*
* в значении свойства type будет строка в скримминг-снейк-кейс нотации, данная
* строка будет описывать выполняемое действие над данными
* */
const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.notes) ? action.notes : state
    }
    case 'ADD': {
      return [...state, action.note]
    }
    case 'TOGGLE_COMPLETE': {
      const {id, isDone} = action

      return state.map((note) => {
        return note.id === id ? {...note, isDone} : note
      })
    }
    case 'DELETE': {
      return state.filter((note) => note.id !== action.id)
    }
    case 'DELETE_ALL': {
      return []
    }
    default: {
      return state
    }
  }
}


const useNotes = () => {
  const [notes, dispatch] = useReducer(notesReducer, [])
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingNoteId, setDisappearingNoteId] = useState(null)
  const [appearingNoteId, setAppearingNoteId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sortOnPriority, setSortOnPriority] = useState(false)


  const {
    hideNotification,
    showNotification,
    notificationType,
  } = useNotification(4000)

  const deleteAllNotes = useCallback(() => {
    const isConfirm = confirm('Вы уверены, что хотите удалить все заметки?')

    if (isConfirm) {
      notesAPI.getAll().then((notes) => {
        notesAPI.deleteAll(notes)
          .then(() => dispatch({type: 'DELETE_ALL'}))
      })
    }
  }, [])

  const deleteNote = useCallback((noteId) => {
    notesAPI.delete(noteId)
      .then(() => {
        setDisappearingNoteId(noteId)
        setTimeout(() => {
          dispatch({type: 'DELETE', id: noteId})
          setDisappearingNoteId(null)
        }, 400)
      })
  }, [])

  const toggleNoteComplete = useCallback((noteId, isDone) => {
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
  }, [filter])

  const addNote = useCallback((title, content, priority, callbackAfterAdding) => {
    const newNote = {
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
          showNotification()
        }
        setAppearingNoteId(addedNote.id)
      })
  }, [filter, showNotification])

  useEffect(() => {
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
    })
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
  }
}

export default useNotes