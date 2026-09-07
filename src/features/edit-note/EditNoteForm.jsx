import Field from "@/shared/ui/Field";
import RadioGroup from "@/shared/ui/RadioGroup";
import {useState} from "react";

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
    editPriority,
    setEditPriority,
    css,
  } = props

  const [isEdit, setIsEdit] = useState({
    title: false,
    content: false,
    isDone: false,
    priority: false,
  })

  const onSubmit = (event) => {
    event.preventDefault()
  }

  const onInput = (event) => {
    const {value, id} = event.target

    if (id === 'title-edit') {
      setIsEdit({
        ...isEdit,
        title: true,
      })
      setEditTitleNote(value)
    } else if (id === 'content-edit') {
      setIsEdit({
        ...isEdit,
        content: true,
      })
      setEditContentNote(value)
    }
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
      <RadioGroup
        name="edit"
        legend="Выберите приоритет для заметки"
        options={priorityVariables}
        valueActive={draft.priority}
      />
    </form>
  )
}

export default EditNoteForm