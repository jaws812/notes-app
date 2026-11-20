import {
  useEffect,
  useRef,
  useState,
  type InputEvent,
  type SubmitEvent,
  type ChangeEvent
} from "react";
import {useNotesActions} from "@/entities/note";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import RadioGroup from "@/shared/ui/RadioGroup";
import type {RadioOption} from "@/shared/utils/types";
import type {NotePriority} from "@/entities/note";

const priorityVariables: RadioOption[] = [
  {value: 'low', text: 'Низкий'},
  {value: 'normal', text: 'Нормальный'},
  {value: 'high', text: 'Высокий'},
]

interface AddNoteFormProps {
  css: Record<string, string>
}

const AddNoteForm = (props: AddNoteFormProps) => {
  const {
    css,
  } = props

  const {
    addNote,
  } = useNotesActions()

  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [activePriority, setActivePriority] = useState<NotePriority>('normal')
  const [errorTitle, setErrorTitle] = useState('')
  const [errorContent, setErrorContent] = useState('')
  const newNoteInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  const clearNewNoteTitle = newNoteTitle.trim()
  const isNewNoteTitleEmpty = clearNewNoteTitle.length === 0
  const clearNewNoteContent = newNoteContent.trim()
  const isNewNoteContentEmpty = clearNewNoteContent.length === 0

  const isNotePriority = (value: string): value is NotePriority => {
    return value === 'low' || value === 'normal' || value === 'high'
  }

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
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
          newNoteInputRef.current?.focus()
        })
    }
  }

  const onInput = (event: InputEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, id} = event.currentTarget
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
    newNoteInputRef.current?.focus()
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
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value

          if (isNotePriority(value)) {
            setActivePriority(value)
          }
        }}
      />
      <Button
        className="note__button"
        type="submit"
        title="Добавить заметку"
        isDisabled={isNewNoteTitleEmpty || isNewNoteContentEmpty}
      >Добавить заметку</Button>
    </form>
  )
}

export default AddNoteForm