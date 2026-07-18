import AddNoteForm from "../../features/add-note/AddNoteForm";
import SearchNoteFrom from "../../features/search-notes/SearchNoteFrom";
import NoteInfo from "../../features/stats/NoteInfo";
import NoteList from "../../entities/note/ui/NoteList/NoteList";
import './Note.scss'
import {useState} from "react";

const Note = () => {
  const [notes, setNotes] = useState([
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

  const filteredNotes = (query) => {
    console.log(`Search: ${query}`)
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
    }
  }

  return (
    <div className="note">
      <h1 className="note__title">Мои заметки</h1>
      <AddNoteForm
        addNote={addNote}
        newNoteTitle={newNoteTitle}
        setNewNoteTitle={setNewNoteTitle}
        newNoteContent={newNoteContent}
        setNewNoteContent={setNewNoteContent}
      />
      <SearchNoteFrom onSearchInput={filteredNotes} />
      <NoteInfo
        total={notes.length}
        done={notes.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick={deleteAllNotes}
      />
      <NoteList
        notes={notes}
        onDeleteNoteButtonClick={deleteNote}
        onNoteCompleteChange={toggleNoteComplete}
      />
    </div>
  )
}

export default Note