import {memo, useContext} from 'react'
import {NoteItem, NotesContext} from "@/entities/note";

const NoteList = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    filteredNotes,
    isShowAllNotes,
    isShowCompletedNotes,
    isShowUnCompletedNotes,
  } = useContext(NotesContext)

  let resultNotes = []

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
    return (<div className={css.emptyMessage}>Задач нет</div>)
  }

  if (hasNotes && isEmptyFilteredNotes) {
    return (<div className={css.emptyMessage}>Задачи не найдены</div>)
  }

  return (
    <ul className={css.list}>
      {resultNotes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
      {/*{(filteredNotes ?? notes).map((note) => (*/}
      {/*  <NoteItem*/}
      {/*    key={note.id}*/}
      {/*    {...note}*/}
      {/*  />*/}
      {/*))}*/}
    </ul>
  )
}

export default memo(NoteList)