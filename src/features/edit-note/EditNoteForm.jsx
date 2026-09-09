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
    setDraft,
    css,
  } = props

  const onSubmit = (event) => {
    event.preventDefault()
  }

  const onInput = (event) => {
    const {value, id} = event.target

    if (id === 'title-edit') {
      setDraft({...draft, title: value})
    } else if (id === 'content-edit') {
      setDraft({...draft, content: value})
    }
  }

  const onChange = (event) => {
    setDraft({...draft, priority: event.target.value})
  }

  const onChangeCheckbox = (event) => {
    setDraft({...draft, isDone: event.target.checked})
  }

  return (
    <form
      className={css.form}
      onSubmit={onSubmit}
    >
      <Field
        className="note__field"
        id="title-edit"
        type="text"
        label="Измените заголовок заметки"
        value={draft.title}
        onInput={onInput}
      />
      <Field
        className="note__field"
        id="content-edit"
        type="textarea"
        rows={30}
        cols={50}
        maxLength={1000}
        label="Измените текст заметки"
        value={draft.content}
        onInput={onInput}
      />
      <div className={css.wrapper}>
        <label htmlFor="edit-status">Измените готовность({draft.isDone ? 'Выполнена' : 'Не выполнена'})
        </label>
        <input
          className={css.checkbox}
          type="checkbox"
          id="edit-status"
          checked={draft.isDone}
          onChange={onChangeCheckbox}
        />
      </div>
      <RadioGroup
        name="edit"
        legend="Выберите приоритет для заметки"
        options={priorityVariables}
        valueActive={draft.priority}
        onChange={onChange}
      />
    </form>
  )
}

export default EditNoteForm