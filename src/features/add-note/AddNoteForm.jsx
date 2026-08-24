import {useContext, useEffect, useRef, useState} from "react";
import {NotesContext} from "@/entities/note";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import RadioGroup from "@/shared/ui/RadioGroup";

const priorityVariables = [
  {value: 'low', text: 'Низкий'},
  {value: 'normal', text: 'Нормальный'},
  {value: 'high', text: 'Высокий'},
]

const AddNoteForm = (props) => {
  const {
    css,
  } = props

  const {
    addNote,
  } = useContext(NotesContext)

  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [activePriority, setActivePriority] = useState('normal')
  const [errorTitle, setErrorTitle] = useState('')
  const [errorContent, setErrorContent] = useState('')

  const newNoteInputRef = useRef(null)


  const clearNewNoteTitle = newNoteTitle.trim()
  const isNewNoteTitleEmpty = clearNewNoteTitle.length === 0
  const clearNewNoteContent = newNoteContent.trim()
  const isNewNoteContentEmpty = clearNewNoteContent.length === 0

  const onSubmit = (event) => {
    event.preventDefault()
    if (!isNewNoteTitleEmpty && !isNewNoteContentEmpty) {
      addNote(
        clearNewNoteTitle,
        clearNewNoteContent,
        activePriority,
        () => {
          setNewNoteTitle('')
          setNewNoteContent('')
          setActivePriority('normal')
          newNoteInputRef.current.focus()
        })
    }
  }

  const onInput = (event) => {
    const {value, id} = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    if (id === 'note-title') {
      setNewNoteTitle(value)
      setErrorTitle(hasOnlySpaces ? 'Заголовок не может быть пустым' : '')
    } else if (id === 'note-content') {
      setNewNoteContent(value)
      setErrorContent(hasOnlySpaces ? 'Контент заметки не может быть пустым' : '')
    }
  }

  useEffect(() => {
    newNoteInputRef.current.focus()
  }, []);

  return (
    <form
      className={css.form}
      onSubmit={onSubmit}
    >
      <Field
        className="note__field"
        id="note-title"
        type="text"
        label="Заголовок заметки"
        value={newNoteTitle}
        error={errorTitle}
        onInput={onInput}
        ref={newNoteInputRef}
      />
      <Field
        className="note__field"
        id="note-content"
        type="textarea"
        label="Текст заметки..."
        rows={30}
        cols={50}
        maxLength={1000}
        value={newNoteContent}
        error={errorContent}
        onInput={onInput}
      />
      <RadioGroup
        name="priority"
        legend="Выберите приоритет заметки:"
        options={priorityVariables}
        valueActive={activePriority}
        onChange={(event) => setActivePriority(event.target.value)}
      />
      <Button
        className="note__button"
        type="submit"
        title="Добавить заметку"
        isDisabled={isNewNoteTitleEmpty || newNoteContent.trim().length === 0}
      >Добавить заметку</Button>
    </form>
  )
}

export default AddNoteForm