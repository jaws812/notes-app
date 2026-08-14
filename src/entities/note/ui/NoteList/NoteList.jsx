import {memo, useContext} from 'react'
import {NoteItem, NotesContext} from "@/entities/note";

const NoteList = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    filteredNotes,
    isShowCompletedNotes,
    isShowUnCompletedNotes,
  } = useContext(NotesContext)

  let resultNotes = null

  if (isShowCompletedNotes) {
    resultNotes = notes.filter(({isDone}) => isDone === true)
  } else if (isShowUnCompletedNotes) {
    resultNotes = notes.filter(({isDone}) => isDone === false)
  } else {
    resultNotes = notes
  }

  const hasNotes = resultNotes.length > 0
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
      {(filteredNotes ?? resultNotes).map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
    </ul>
  )
}

export default memo(NoteList)