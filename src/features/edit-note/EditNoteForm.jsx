import Field from "@/shared/ui/Field";
import RadioGroup from "@/shared/ui/RadioGroup";

const priorityVariables = [
  {value: 'low', text: 'Низкий'},
  {value: 'normal', text: 'Нормальный'},
  {value: 'high', text: 'Высокий'},
]

const EditNoteForm = (props) => {
  const {
    draft,
    css,
  } = props

  const onSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form
      css={css.form}
      onSubmit={onSubmit}
    >
      <Field
        className="note__field"
        id="title-edit"
        type="text"
        label="Измените заголовок заметки"
        value={draft.title}
      />
      <Field
        className="note__field"
        id="title-edit"
        type="text"
        label="Измените текст заметки"
        value={draft.content}
      />
      <RadioGroup
        name='edit'
        legend="Выберите приоритет для заметки"
        options={priorityVariables}
        // valueActive={draft.priority}
      />

    </form>
  )
}

export default EditNoteForm