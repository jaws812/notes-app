import {useEffect, useState} from "react";
import notesAPI from "../../shared/api/notes/notesAPI";

const NotePage = () => {
  const noteId = '123'

  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    notesAPI.getById(noteId)
      .then((noteData)=>{
        setNote(noteData)
        setHasError(false)
      })
      .catch(()=>{
        setHasError(true)
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if(hasError){
    return <div>Задача не найдена!</div>
  }

  return (
    <div>
      <h1>{note.title}</h1>
      {note.isDone ? 'Заметка выполнена' : 'Заметка не выполнена'}
    </div>
  )
}

export default NotePage