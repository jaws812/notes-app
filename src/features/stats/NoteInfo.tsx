import {memo, useMemo} from 'react'
import {useNotesActions, useNotesData} from "@/entities/note";
import Button from "@/shared/ui/Button";

interface NoteInfoProps {
  css: Record<string, string>;
}

const NoteInfo = (props: NoteInfoProps) => {
  const {
    css,
  } = props

  const {
    deleteAllNotes,
  } = useNotesActions()

  const {
    notes,
  } = useNotesData()

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