import {memo, useContext} from 'react'
import {NoteItem, NotesContext} from "@/entities/note";

const NoteList = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    filteredNotes,
    // isShowCompletedNotes,
    // isShowUnCompletedNotes,
  } = useContext(NotesContext)

  const hasNotes = filteredNotes.length > 0
  const isEmptyFilteredNotes = filteredNotes?.length === 0

  console.log('hasNotes - заметки есть?', hasNotes)
  console.log('isEmptyFilteredNotes - заметки по поиску есть? ', isEmptyFilteredNotes)

  if (!hasNotes) {
    return (<div className={css.emptyMessage}>Заметок нет</div>)
  }

  if (hasNotes && isEmptyFilteredNotes) {
    return (<div className={css.emptyMessage}>Заметки не найдены</div>)
  }
  // else if (hasNotes && isEmptyFilteredNotes && isShowUnCompletedNotes) {
  //   return (<div className={css.emptyMessage}>Активные заметки не найдены</div>)
  // }

  return (
    <ul className={css.list}>
      {filteredNotes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
    </ul>
  )
}

export default memo(NoteList)