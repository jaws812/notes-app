import {memo} from 'react'
import NoteItem from "../NoteItem/NoteItem";

const NoteList = (props) => {
  const {
    notes,
    filteredNotes,
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
    onDeleteNoteButtonClick,
    onNoteCompleteChange,
    css,
  } = props

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
          ref={note.id === firstIncompleteNoteId ? firstIncompleteNoteRef : null}
          onDeleteNoteButtonClick={onDeleteNoteButtonClick}
          onNoteCompleteChange={onNoteCompleteChange}
          {...note}
        />
      ))}
    </ul>
  )
}

export default memo(NoteList)