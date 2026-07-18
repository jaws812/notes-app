import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";

const AddNoteForm = (props) => {
  const {
    addNote,
    newNoteTitle,
    setNewNoteTitle,
    newNoteContent,
    setNewNoteContent,
    css,
  } = props

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
      />
    </form>
  )
}

export default AddNoteForm