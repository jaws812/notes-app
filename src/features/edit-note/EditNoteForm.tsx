import Field from "@/shared/ui/Field";
import RadioGroup from "@/shared/ui/RadioGroup";
import Button from "@/shared/ui/Button";
import {
  Dispatch, SetStateAction, useState, type MouseEventHandler, type SubmitEvent,
  type InputEvent, type ChangeEvent
} from "react";
import type {RadioOption} from "@/shared/utils/types";
import type {NewNote, NotePriority} from "@/entities/note";

const priorityVariables: RadioOption[] = [
  {value: 'low', text: 'Низкий'},
  {value: 'normal', text: 'Нормальный'},
  {value: 'high', text: 'Высокий'},
]

interface EditNoteFormProps {
  draft: NewNote;
  setDraft: Dispatch<SetStateAction<NewNote>>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onSave: MouseEventHandler<HTMLButtonElement>;
  css: Record<string, string>;
}

const EditNoteForm = (props: EditNoteFormProps) => {
  const {
    draft,
    setDraft,
    onClick,
    onSave,
    css,
  } = props

  const [errorTitle, setErrorTitle] = useState('')
  const [errorContent, setErrorContent] = useState('')

  const isNotePriority = (value: string): value is NotePriority => {
    return value === 'low' || value === 'normal' || value === 'high'
  }

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const onInput = (event: InputEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, id} = event.currentTarget
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setDraft({...draft, [id]: value})

    if (id === 'title') {
      setErrorTitle(hasOnlySpaces ? 'Измененный текст заголовка не может быть пустым' : '')
    } else if (id === 'content') {
      setErrorContent(hasOnlySpaces ? 'Измененный текст заметки не может быть пустым' : '')
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNotePriority(event.target.value)) {
      setDraft({
        ...draft, priority: event.target.value
      })
    }
  }

  const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft({...draft, isDone: event.target.checked})
  }

  return (
    <form
      className={css.form}
      onSubmit={onSubmit}
    >
      <Field
        className="note__field"
        id="title"
        type="text"
        label="Измените заголовок заметки"
        value={draft.title}
        onInput={onInput}
        error={errorTitle}
      />
      <Field
        className="note__field"
        id="content"
        type="textarea"
        rows={30}
        cols={50}
        maxLength={1000}
        label="Измените текст заметки"
        value={draft.content}
        onInput={onInput}
        error={errorContent}
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
      <div className={css.buttons}>
        <Button onClick={onClick}>Отменить редактирование</Button>
        <Button
          onClick={onSave}
          type="submit"
          isDisabled={draft.title.trim().length === 0 || draft.content.trim().length === 0}
        >Сохранить</Button>
      </div>
    </form>
  )
}

export default EditNoteForm