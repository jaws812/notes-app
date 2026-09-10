import {useEffect, useState} from "react";
import notesAPI from "@/shared/api/notes";
import RouterLink from "@/shared/ui/RouterLink";
import Button from "@/shared/ui/Button";
import EditNoteForm from "@/features/edit-note";
import useNotification from "@/shared/utils/useNotification";
import css from "./NotePage.module.scss";
import Notification from "@/shared/ui/Notification";

const textMessages = {
  'edit-error': 'Не удалось отредактировать заметку, проблемы с сервером.',
}

const priorityLabels = {
  low: 'Низкий',
  normal: 'Нормальный',
  high: 'Высокий',
}

const NotePage = (props) => {
  const {params} = props
  const noteId = params.id

  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    title: '',
    content: '',
    isDone: '',
    priority: '',
  })

  const {
    hideNotification,
    showNotification,
    notificationType,
  } = useNotification()

  useEffect(() => {
    notesAPI.getById(noteId)
      .then((noteData) => {
        setNote(noteData)
        setHasError(false)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [noteId]);

  const onClick = () => {
    if (isEditing) {
      setDraft({
        title: '',
        content: '',
        isDone: '',
        priority: '',
      })
    } else {
      setDraft({
        title: note.title,
        content: note.content,
        isDone: note.isDone,
        priority: note.priority,
      })
    }
    setIsEditing(!isEditing)
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (hasError) {
    return <div>Заметка не найдена!</div>
  }

  const onSave = () => {
    const editNote = {
      title: draft.title,
      content: draft.content,
      isDone: draft.isDone,
      priority: draft.priority,
    }

    notesAPI.edit(note.id, editNote)
      .then((editedNote) => {
        setNote(editedNote)
        setIsEditing(false)
      })
      .catch(() => {
        showNotification('edit-error')
      })
  }

  return (
    <div className={css.notePage}>
      {!isEditing && (
        <>
          <h1 className={css.title}>{note.title}</h1>
          <div>{note.content}</div>
          <div>{note.isDone ? 'Заметка выполнена' : 'Заметка не выполнена'}</div>
          <div className={css.priority}>Приоритет: {priorityLabels[note.priority]}</div>
          <Button onClick={onClick}>Редактировать заметку</Button>
          <RouterLink
            className={css.link}
            to={`/`}
          >Вернуться к списку заметок</RouterLink>
        </>
      )}
      {isEditing && (
        <>
          <EditNoteForm
            css={css}
            draft={draft}
            setDraft={setDraft}
            onClick={onClick}
            onSave={onSave}
          />
          <RouterLink
            className={css.link}
            to={`/`}
          >Вернуться к списку заметок</RouterLink>
        </>
      )
      }
      <div role="status">
        {notificationType !== null &&
          <Notification
            text={textMessages[notificationType]}
            isErrorMessage={notificationType !== "show-add"}
            onClick={hideNotification}
          />}
      </div>
    </div>
  )
}

export default NotePage