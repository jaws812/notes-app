import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import notesAPI from "@/shared/api/notes";

const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingNoteId, setDisappearingNoteId] = useState(null)
  const [appearingNoteId, setAppearingNoteId] = useState(null)

  const newNoteInputRef = useRef(null)

  const deleteAllNotes = useCallback(() => {
    const isConfirm = confirm('Вы уверены, что хотите удалить все задачи?')

    if (isConfirm) {
      notesAPI.deleteAll(notes)
        .then(() => setNotes([]))
    }
  }, [notes])

  const deleteNote = useCallback((noteId) => {
    notesAPI.delete(noteId)
      .then(() => {
        setDisappearingNoteId(noteId)
        setTimeout(() => {
          setNotes(
            notes.filter((note) => note.id !== noteId)
          )
          setDisappearingNoteId(null)
        }, 400)
      })
  }, [notes])

  const toggleNoteComplete = useCallback((noteId, isDone) => {

    notesAPI.toggleComplete(noteId, isDone)
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

    notesAPI.add(newNote)
      .then((addedNote) => {
        setNotes(prevNotes => [...prevNotes, addedNote])
        setNewNoteTitle('')
        setNewNoteContent('')
        setSearchQuery('')
        newNoteInputRef.current.focus()
        setAppearingNoteId(addedNote.id)
        setTimeout(()=>{
          setAppearingNoteId(null)
        },400)
      })
  }, [])

  useEffect(() => {
    newNoteInputRef.current.focus()

    notesAPI.getAll().then(setNotes)
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
    disappearingNoteId,
    appearingNoteId,
  }
}

export default useNotes