import {useEffect, useState} from "react";
import notesAPI from "@/shared/api/notes";
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

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (hasError) {
    return <div>Заметка не найдена!</div>
  }

  return (
    <div className={css.notePage}>
      <h1 className={css.title}>{note.title}</h1>
      <div>{note.content}</div>
      <div>{note.isDone ? 'Заметка выполнена' : 'Заметка не выполнена'}</div>
      <div className={css.priority}>Приоритет: {priorityLabels[note.priority]}</div>
    </div>
  )
}

export default NotePage