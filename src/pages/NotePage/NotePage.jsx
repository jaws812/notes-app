import {useEffect, useState} from "react";
import notesAPI from "@/shared/api/notes";
import RouterLink from "@/shared/ui/RouterLink";
import Button from "@/shared/ui/Button";
import EditNoteForm from "@/features/edit-note";
import css from "./NotePage.module.scss";

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
    //
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
          <EditNoteForm css={css} draft={draft}/>
          <div className={css.buttons}>
            <Button onClick={onClick}>Отменить редактирование</Button>
            <Button onClick={onSave}>Сохранить</Button>
          </div>
          <RouterLink
            className={css.link}
            to={`/`}
          >Вернуться к списку заметок</RouterLink>
        </>
      )
      }
    </div>
  )
}

export default NotePage