import {useCallback, useEffect, useMemo, useRef, useState} from "react";

const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const newNoteInputRef = useRef(null)

  const deleteAllNotes = useCallback(() => {
    const isConfirm = confirm('Вы уверены, что хотите удалить все задачи?')

    if (isConfirm) {
      Promise.all(
        notes.map(({id}) => {
          return fetch(`http://localhost:3001/notes/${id}`, {
            method: 'DELETE',
          })
        })
      )
        .then(() => setNotes([]))
    }
  }, [notes])

  const deleteNote = useCallback((noteId) => {
    fetch(`http://localhost:3001/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNotes(
          notes.filter((note) => note.id !== noteId)
        )
      })
  }, [notes])

  const toggleNoteComplete = useCallback((noteId, isDone) => {

    fetch(`http://localhost:3001/notes/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({isDone})
    })
      .then(() => {
        setNotes(
          notes.map((note) => {
            if (note.id === noteId) {
              return {...note, isDone}
            }

            return note
          })
        )
      })
  }, [notes])

  const addNote = useCallback((title, content) => {
    const newNote = {
      title,
      content,
      isDone: false,
    }

    fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote)
    })
      .then((response) => response.json())
      .then((addedNote) => {
        setNotes(prevNotes => [...prevNotes, addedNote])
        setNewNoteTitle('')
        setNewNoteContent('')
        setSearchQuery('')
        newNoteInputRef.current.focus()
      })
  }, [newNoteContent])

  useEffect(() => {
    newNoteInputRef.current.focus()

    fetch('http://localhost:3001/notes')
      .then((response) => response.json())
      .then(setNotes)
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