import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import AddNoteForm from "../../features/add-note/AddNoteForm";
import SearchNoteFrom from "../../features/search-notes/SearchNoteFrom";
import NoteInfo from "../../features/stats/NoteInfo";
import NoteList from "../../entities/note/ui/NoteList/NoteList";
import Button from "../../shared/ui/Button/Button";
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

  const newNoteInputRef = useRef(null)
  const firstIncompleteNoteRef = useRef(null)
  const firstIncompleteNoteId = notes.find(({isDone}) => !isDone)?.id
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

  const addNote = useCallback(() => {
    if (newNoteTitle.trim().length > 0 && newNoteContent.trim().length > 0) {
      const newNote = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newNoteTitle,
        content: newNoteContent,
        isDone: false,
      }

      setNotes([(prevNotes) => [...prevNotes, newNote]])
      setNewNoteTitle('')
      setNewNoteContent('')
      setSearchQuery('')
      newNoteInputRef.current.focus()
    }
  }, [newNoteTitle, newNoteContent])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
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

  const doneNotes = useMemo(() => {
    return notes.filter(({isDone}) => isDone).length
  }, notes)

  return (
    <div className={css.note}>
      <h1 className={css.title}>Мои заметки</h1>
      <AddNoteForm
        addNote={addNote}
        newNoteTitle={newNoteTitle}
        setNewNoteTitle={setNewNoteTitle}
        newNoteContent={newNoteContent}
        setNewNoteContent={setNewNoteContent}
        newNoteInputRef={newNoteInputRef}
        css={css}
      />
      <SearchNoteFrom
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        css={css}
      />
      <NoteInfo
        total={notes.length}
        done={doneNotes}
        onDeleteAllButtonClick={deleteAllNotes}
        css={css}
      />
      <Button
        onClick={
          () => firstIncompleteNoteRef.current?.scrollIntoView({behavior: 'smooth'})
        }
        allWidth
      >Перейти к первой невыполненной задаче</Button>
      <NoteList
        notes={notes}
        filteredNotes={filteredNotes}
        firstIncompleteNoteRef={firstIncompleteNoteRef}
        firstIncompleteNoteId={firstIncompleteNoteId}
        onDeleteNoteButtonClick={deleteNote}
        onNoteCompleteChange={toggleNoteComplete}
        css={css}
      />
    </div>
  )
}

export default Note