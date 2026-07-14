import Field from "../../shared/ui/Field/Field";
import Button from "../../shared/ui/Button/Button";

const AddNoteForm = () => {
  return (
    <form className="note__form">
      <Field
        className="note__field"
        id="note-title"
        type="text"
        label="Заголовок заметки"
      />
      <Field
        className="note__field"
        id="note-content"
        type="text"
        label="Текст заметки..."
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