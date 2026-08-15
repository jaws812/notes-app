import {memo, useContext} from 'react'
import {NoteItem, NotesContext} from "@/entities/note";

const NoteList = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    actuallyNotes,
    filteredNotes,
    isShowCompletedNotes,
    isShowUnCompletedNotes,
  } = useContext(NotesContext)

  const hasNotes = actuallyNotes.length > 0
  const isEmptyFilteredNotes = filteredNotes?.length === 0

  if (!hasNotes) {
    return (<div className={css.emptyMessage}>Заметок нет</div>)
  }

  if (hasNotes && isEmptyFilteredNotes && isShowCompletedNotes) {
    return (
      <div className={css.emptyMessage}>Выполненные заметки не найдены</div>)
  } else if (hasNotes && isEmptyFilteredNotes && isShowUnCompletedNotes) {
    return (<div className={css.emptyMessage}>Активные заметки не найдены</div>)
  } else if (hasNotes && isEmptyFilteredNotes) {
    return (<div className={css.emptyMessage}>3аметки не найдены</div>)
  }

  return (
    <ul className={css.list}>
      {(filteredNotes ?? actuallyNotes).map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
    </ul>
  )
}

export default memo(NoteList)