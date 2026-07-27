import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useNotesLocalStorage from "./useNotesLocalStorage";

const useNotes = () => {
  const {
    savedNotes,
    saveNotes
  } = useNotesLocalStorage()

  const [notes, setNotes] = useState(savedNotes ?? [
    {
      id: 1,
      title: "Купить продукты",
      content: "Молоко, мед, творог",
      isDone: true,
    },
    {
      id: 2,
      title: "Погладить кота",
      content: "Сегодня вечером",
      isDone: false,
    },
    {
      id: 3,
      title: "Построить дом",
      content: "Лес, озеро",
      isDone: true,
    },
  ])
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const newNoteInputRef = useRef(null)

  const deleteAllNotes = useCallback(() => {
    const isConfirm = confirm('Вы уверены, что хотите удалить все задачи?')

    if (isConfirm) {
      setNotes([])
    }
  }, [])

  const deleteNote = useCallback((noteId) => {
    setNotes(
      notes.filter((note) => note.id !== noteId)
    )
  }, [notes])

  const toggleNoteComplete = useCallback((noteId, isDone) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return {...note, isDone}
        }

        return note
      })
    )
  }, [notes])

  const addNote = useCallback((title, content) => {
    const newNote = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      content,
      isDone: false,
    }

    setNotes(prevNotes => [...prevNotes, newNote])
    setNewNoteTitle('')
    setNewNoteContent('')
    setSearchQuery('')
    newNoteInputRef.current.focus()
  }, [newNoteContent])

  useEffect(() => {
    saveNotes(notes)
  }, [notes]);

  useEffect(() => {
    newNoteInputRef.current.focus()
  }, []);

  const filteredNotes = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? notes.filter(({title, content}) =>
        title.toLowerCase().includes(clearSearchQuery) ||
        content.toLowerCase().includes(clearSearchQuery)
      )
      : null
  }, [notes, searchQuery])

  return {
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
  }
}

export default useNotes