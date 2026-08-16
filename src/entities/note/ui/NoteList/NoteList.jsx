import {memo, useContext} from 'react'
import {NoteItem, NotesContext} from "@/entities/note";

const NoteList = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    visibleNotes,
    filteredNotes,
    filter,
  } = useContext(NotesContext)

  const hasNotes = notes.length > 0
  const isEmptyFilteredNotes = filteredNotes?.length === 0

  if (!hasNotes) {
    return (<div className={css.emptyMessage}>Заметок нет</div>)
  }

  if (hasNotes && filter === 'active' && visibleNotes.length === 0) {
    return (<div className={css.emptyMessage}>Активных заметок нет</div>)
  }

  if (hasNotes && filter === 'active' && visibleNotes.length > 0 && isEmptyFilteredNotes) {
    return (<div className={css.emptyMessage}>Активных заметок не найдено</div>)
  }

  if (hasNotes && filter === 'completed' && visibleNotes.length === 0) {
    return (<div className={css.emptyMessage}>Выполненных заметок нет</div>)
  }

  if (hasNotes && filter === 'completed' && visibleNotes.length > 0 && isEmptyFilteredNotes) {
    return (
      <div className={css.emptyMessage}>Выполненных заметок не найдено</div>)
  }

  if (hasNotes && isEmptyFilteredNotes) {
    return (<div className={css.emptyMessage}>Заметок не найдено</div>)
  }

  return (
    <ul className={css.list}>
      {(filteredNotes ?? visibleNotes).map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
    </ul>
  )
}

export default memo(NoteList)