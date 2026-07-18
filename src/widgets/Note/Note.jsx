import {useState, useEffect} from "react";
import AddNoteForm from "../../features/add-note/AddNoteForm";
import SearchNoteFrom from "../../features/search-notes/SearchNoteFrom";
import NoteInfo from "../../features/stats/NoteInfo";
import NoteList from "../../entities/note/ui/NoteList/NoteList";
import css from './Note.module.scss'

const Note = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')

    if (savedNotes) {
      return JSON.parse(savedNotes)
    }

    return [
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
    ]
  })
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')


  const deleteAllNotes = () => {
    const isConfirm = confirm('Вы уверены, что хотите удалить все задачи?')

    if (isConfirm) {
      setNotes([])
    }
  }

  const deleteNote = (noteId) => {
    setNotes(
      notes.filter((note) => note.id !== noteId)
    )
  }

  const toggleNoteComplete = (noteId, isDone) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return {...note, isDone}
        }

        return note
      })
    )
  }

  const addNote = () => {
    if (newNoteTitle.trim().length > 0 && newNoteContent.trim().length > 0) {
      const newNote = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newNoteTitle,
        content: newNoteContent,
        isDone: false,
      }

      setNotes([...notes, newNote])
      setNewNoteTitle('')
      setNewNoteContent('')
      setSearchQuery('')
    }
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes]);

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredNotes = clearSearchQuery.length > 0
    ? notes.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
    : null

  return (
    <div className={css.note}>
      <h1 className={css.title}>Мои заметки</h1>
      <AddNoteForm
        addNote={addNote}
        newNoteTitle={newNoteTitle}
        setNewNoteTitle={setNewNoteTitle}
        newNoteContent={newNoteContent}
        setNewNoteContent={setNewNoteContent}
        css={css}
      />
      <SearchNoteFrom
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        css={css}
      />
      <NoteInfo
        total={notes.length}
        done={notes.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick={deleteAllNotes}
        css={css}
      />
      <NoteList
        notes={notes}
        filteredNotes={filteredNotes}
        onDeleteNoteButtonClick={deleteNote}
        onNoteCompleteChange={toggleNoteComplete}
        css={css}
      />
    </div>
  )
}

export default Note