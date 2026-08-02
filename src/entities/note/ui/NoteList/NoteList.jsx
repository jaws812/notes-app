import {memo, useContext} from 'react'
import {NoteItem, NotesContext} from "@/entities/note";

const NoteList = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    filteredNotes,
  } = useContext(NotesContext)

  const hasNotes = notes.length > 0
  const isEmptyFilteredNotes = filteredNotes?.length === 0

  if (!hasNotes) {
    return (<div className={css.emptyMessage}>Задач нет</div>)
  }

  if (hasNotes && isEmptyFilteredNotes) {
    return (<div className={css.emptyMessage}>Задачи не найдены</div>)
  }


  return (
    <ul className={css.list}>
      {(filteredNotes ?? notes).map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
    </ul>
  )
}

export default memo(NoteList)