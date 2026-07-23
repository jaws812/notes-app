import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";
import {useContext} from "react";
import {NotesContext} from "../../entities/note/model/NotesContext";

const AddNoteForm = (props) => {
  const {
    css,
  } = props

  const {
    addNote,
    newNoteTitle,
    setNewNoteTitle,
    newNoteContent,
    setNewNoteContent,
    newNoteInputRef,
  } = useContext(NotesContext)

  const onSubmit = (event) => {
    event.preventDefault()
    addNote()
  }

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
        onInput={(event) => setNewNoteTitle(event.target.value)}
        ref={newNoteInputRef}
      />
      <Field
        className="note__field"
        id="note-content"
        type="text"
        label="Текст заметки..."
        value={newNoteContent}
        onInput={(event) => setNewNoteContent(event.target.value)}
      />
      <Button
        className="note__button"
        type="submit"
        title="Добавить заметку"
      >Добавить заметку</Button>
    </form>
  )
}

export default AddNoteForm