import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"

export const NotesContext = createContext({})

export const NotesProvider = (props) => {
  const {
    children,
  } = props

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

      setNotes(prevNotes => [...prevNotes, newNote])
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

  return (
    <NotesContext.Provider
      value={{
        notes,
        filteredNotes,
        firstIncompleteNoteRef,
        firstIncompleteNoteId,
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
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}
