import {
  useCallback,
  useEffect,
  useMemo, useReducer,
  useRef,
  useState,
} from "react";
import notesAPI from "@/shared/api/notes";

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
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingNoteId, setDisappearingNoteId] = useState(null)
  const [appearingNoteId, setAppearingNoteId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [showNotification, setShowNotification] = useState(null) // null / 'show'

  const newNoteInputRef = useRef(null)
  const notificationTimer = useRef(null)

  const deleteAllNotes = useCallback(() => {
    const isConfirm = confirm('Вы уверены, что хотите удалить все заметки?')

    if (isConfirm) {
      notesAPI.deleteAll(notes)
        .then(() => dispatch({type: 'DELETE_ALL'}))
    }
  }, [notes])

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

  const addNote = useCallback((title, content) => {
    const newNote = {
      title,
      content,
      isDone: false,
    }

    notesAPI.add(newNote)
      .then((addedNote) => {
        dispatch({type: 'ADD', note: addedNote})
        setNewNoteTitle('')
        setNewNoteContent('')
        setSearchQuery('')
        newNoteInputRef.current.focus()
        if (filter === 'completed') {
          clearTimeout(notificationTimer.current)
          setShowNotification('show')
          notificationTimer.current = setTimeout(() => {
            setShowNotification(null)
          }, 4000)
        }
        setAppearingNoteId(addedNote.id)
        setTimeout(() => {
          setAppearingNoteId(null)
        }, 400)
      })
  }, [filter])

  useEffect(() => {
    newNoteInputRef.current.focus()

    notesAPI.getAll().then((serverNotes) => {
      dispatch({type: 'SET_ALL', notes: serverNotes})
    })
  }, []);

  useEffect(() => {
    return () => clearTimeout(notificationTimer.current)
  }, []);

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

  return {
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
    showNotification,
    setShowNotification,
  }
}

export default useNotes