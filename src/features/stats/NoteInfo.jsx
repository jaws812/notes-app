import {memo, useContext, useMemo} from 'react'
import {NotesContext} from "@/entities/note";
import Button from "@/shared/ui/Button";

const NoteInfo = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    deleteAllNotes,
  } = useContext(NotesContext)

  const total = notes.length
  const hasNotes = total > 0
  const done = useMemo(() => {
    return notes.filter(({isDone}) => isDone).length
  }, [notes])


  return (
    <div className={css.info}>
      <div>Завершено {done} из {total}</div>
      {hasNotes && (
        <Button
          className={css.deleteAllButton}
          title="Удалить все"
          onClick={deleteAllNotes}
        >Удалить все</Button>
      )}
    </div>
  )
}

export default memo(NoteInfo)