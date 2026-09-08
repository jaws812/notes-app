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
    editTitleNote,
    setEditTitleNote,
    editContentNote,
    setEditContentNote,
    editToggleNote,
    setEditToggleNote,
    editPriorityNote,
    setEditPriorityNote,
    isEdit,
    setIsEdit,
    css,
  } = props

  const onSubmit = (event) => {
    event.preventDefault()
  }

  const onInput = (event) => {
    const {value, id} = event.target

    if (id === 'title-edit') {
      if (!isEdit.title) {
        setIsEdit({
          ...isEdit,
          title: true,
        })
      }
      setEditTitleNote(value)
    } else if (id === 'content-edit') {
      if (!isEdit.content) {
        setIsEdit({
          ...isEdit,
          content: true,
        })
      }
      setEditContentNote(value)
    }
  }

  const onChange = (event) => {
    if (!isEdit.priority) {
      setIsEdit({
        ...isEdit,
        priority: true,
      })
    }
    setEditPriorityNote(event.target.value)
  }

  const onChangeCheckbox = (event) => {
    if (!isEdit.isDone) {
      setIsEdit({
        ...isEdit,
        isDone: true,
      })
    }
    setEditToggleNote(event.target.checked)
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
        value={isEdit.title ? editTitleNote : draft.title}
        onInput={onInput}
      />
      <Field
        className="note__field"
        id="content-edit"
        type="text"
        label="Измените текст заметки"
        value={isEdit.content ? editContentNote : draft.content}
        onInput={onInput}
      />
      <div className={css.wrapper}>
        <label htmlFor="edit-status">Измените готовность({
          isEdit.isDone
            ? `${editToggleNote ? 'Выполнена' : 'Не выполнена'}`
            : `${draft.isDone ? 'Выполнена' : 'Не выполнена'}`
        })
        </label>
        <input
          className={css.checkbox}
          type="checkbox"
          id="edit-status"
          checked={isEdit.isDone ? editToggleNote : draft.isDone}
          onChange={onChangeCheckbox}
        />
      </div>

      <RadioGroup
        name="edit"
        legend="Выберите приоритет для заметки"
        options={priorityVariables}
        valueActive={isEdit.priority ? editPriorityNote : draft.priority}
        onChange={onChange}
      />
    </form>
  )
}

export default EditNoteForm